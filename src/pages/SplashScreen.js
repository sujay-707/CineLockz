import React, { useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={styles.splashScreen}>
      <img src="/assets/logo.png" alt="BookMyShow Logo" style={styles.logo} />
    </div>
  );
};

const styles = {
  splashScreen: {
    height: "100vh",
    backgroundColor: "rgba(212, 239, 244, 1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "600px",
    opacity: 0,
    animation: "fadeIn 2s ease-in-out forwards, scaleUp 2s ease-in-out forwards",
  },
};

// Add global styles in index.css or use a <style> tag
const css = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { transform: scale(0.8); }
  to { transform: scale(1); }
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default SplashScreen;

