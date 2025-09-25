// AdminDashboard.js
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Tabs, Tab, Table, Button, Form, Container } from "react-bootstrap";
import DashboardStats from "./DashboardStats";
import { useLocation } from "react-router-dom";
// import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [key, setKey] = useState("stats");
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: "",
    genre: "",
    language: "",
    releaseDate: "",
    price: "",
    totalSeats: "",
    image: "",
    trailer: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // Select tab based on URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && ["stats", "users", "movies", "tickets"].includes(hash)) {
      setKey(hash);
    }
  }, [location.hash]);

  const headers = useMemo(() => (user ? { userId: user._id } : {}), [user]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    axios
      .get("http://localhost:5000/api/admin/stats", { headers })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/admin/users", { headers })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/admin/movies", { headers })
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/api/admin/tickets", { headers })
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, [headers, user]);

  if (!user)
    return (
      <p className="text-center mt-5">Please login to access admin dashboard</p>
    );
  if (!user.isAdmin)
    return <p className="text-center mt-5">Access Denied</p>;

  // Add a new movie
  const addMovie = () => {
    const { name, genre, language, releaseDate, price } = newMovie;
    if (!name || !genre || !language || !releaseDate || !price) {
      alert(
        "Please fill in all required fields: Name, Genre, Language, Release Date, Price"
      );
      return;
    }

    axios
      .post("http://localhost:5000/api/admin/movies", newMovie, { headers })
      .then((res) => setMovies([...movies, res.data]))
      .catch((err) => {
        console.error(err);
        alert(
          "Failed to add movie: " + (err.response?.data?.message || err.message)
        );
      })
      .finally(() => {
        setNewMovie({
          name: "",
          genre: "",
          language: "",
          releaseDate: "",
          price: "",
          totalSeats: "",
          image: "",
          trailer: "",
        });
      });
  };

  // Delete movie
  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/admin/movies/${id}`, { headers })
      .then(() => setMovies(movies.filter((m) => m._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4 text-center">Admin Dashboard</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        {/* Stats Tab */}
        <Tab eventKey="stats" title="Stats">
          <DashboardStats stats={stats} />
        </Tab>

        {/* Users Tab */}
        <Tab eventKey="users" title="Users">
          <div className="table-responsive mb-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.email}</td>
                    <td>{u.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        {/* Movies Tab */}
        <Tab eventKey="movies" title="Movies">
          <Form className="mb-3 d-flex gap-2 flex-wrap">
            <Form.Control
              placeholder="Name"
              value={newMovie.name}
              onChange={(e) =>
                setNewMovie({ ...newMovie, name: e.target.value })
              }
            />
            <Form.Control
              placeholder="Genre"
              value={newMovie.genre}
              onChange={(e) =>
                setNewMovie({ ...newMovie, genre: e.target.value })
              }
            />
            <Form.Control
              placeholder="Language"
              value={newMovie.language}
              onChange={(e) =>
                setNewMovie({ ...newMovie, language: e.target.value })
              }
            />
            <Form.Control
              placeholder="Release Date"
              value={newMovie.releaseDate}
              onChange={(e) =>
                setNewMovie({ ...newMovie, releaseDate: e.target.value })
              }
            />
            <Form.Control
              placeholder="Price"
              type="number"
              value={newMovie.price}
              onChange={(e) =>
                setNewMovie({ ...newMovie, price: e.target.value })
              }
            />
            <Form.Control
              placeholder="Total Seats"
              type="number"
              value={newMovie.totalSeats}
              onChange={(e) =>
                setNewMovie({ ...newMovie, totalSeats: e.target.value })
              }
            />
            <Form.Control
              placeholder="Image URL"
              value={newMovie.image}
              onChange={(e) =>
                setNewMovie({ ...newMovie, image: e.target.value })
              }
            />
            <Form.Control
              placeholder="Trailer ID"
              value={newMovie.trailer}
              onChange={(e) =>
                setNewMovie({ ...newMovie, trailer: e.target.value })
              }
            />
            <Button variant="success" onClick={addMovie}>
              Add Movie
            </Button>
          </Form>

          <div className="table-responsive mb-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Genre</th>
                  <th>Language</th>
                  <th>Release Date</th>
                  <th>Price</th>
                  <th>Total Seats</th>
                  <th>Booked Seats</th>
                  <th>Image</th>
                  <th>Trailer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((m) => (
                  <tr key={m._id}>
                    <td>{m.name}</td>
                    <td>{m.genre}</td>
                    <td>{m.language}</td>
                    <td>{m.releaseDate}</td>
                    <td>₹{m.price}</td>
                    <td>{m.totalSeats}</td>
                    <td>{m.bookedSeats?.join(", ") || "None"}</td>
                    <td>{m.image && <img src={m.image} alt={m.name} width={50} />}</td>
                    <td>
                      {m.trailer ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${m.trailer}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch
                        </a>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => deleteMovie(m._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>

        {/* Tickets Tab */}
        <Tab eventKey="tickets" title="Tickets">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Movie Name</th>
                  <th>Booked Seats</th>
                  <th>Unlocked Seats</th>
                  <th>QR Codes</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => {
                  const userObj = users.find((u) => u._id === t.userId);
                  const movieObj = movies.find((m) => m._id === t.movieId);
                  return (
                    <tr key={t._id}>
                      <td>{userObj ? userObj.email : t.userId}</td>
                      <td>{movieObj ? movieObj.name : t.movieId}</td>
                      <td>{t.seats.join(", ")}</td>
                      <td>{t.unlockedSeats?.join(", ") || "None"}</td>
                      <td>{t.qrCodes?.join(", ") || "None"}</td>
                      <td>{t.date}</td>
                      <td>{t.time}</td>
                      <td>₹{t.totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}
