import React from "react";

const DoctorCard = ({ doctor, onDelete }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      margin: "0.5rem",
      width: "250px",
    }}>
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
      {onDelete && <button onClick={() => onDelete(doctor._id)}>Delete</button>}
    </div>
  );
};

export default DoctorCard;
