import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "1rem",
      backgroundColor: "#1976d2",
      color: "white",
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/patients" style={{ color: "white", textDecoration: "none" }}>Patients</Link>
      <Link to="/doctors" style={{ color: "white", textDecoration: "none" }}>Doctors</Link>
      <Link to="/appointments" style={{ color: "white", textDecoration: "none" }}>Appointments</Link>
    </nav>
  );
};

export default Navbar;
