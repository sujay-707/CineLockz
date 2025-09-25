import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function DashboardStats({ stats }) {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Title>Total Users</Card.Title>
            <Card.Text>{stats.totalUsers || 0}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Title>Total Movies</Card.Title>
            <Card.Text>{stats.totalMovies || 0}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Title>Total Tickets</Card.Title>
            <Card.Text>{stats.totalTickets || 0}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
