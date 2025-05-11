import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import check from "../Animation/check.json";
import "./confirmation.css";

const Confirmation = () => {
  const location = useLocation();
  const { 
    doctorName = "Dr. Nourhan Mokhtar",
    date = new Date().toISOString().split('T')[0],
    time = "02:00 PM",
    cost = "50 EGP",
    reservationNumber = `D-${Math.floor(100000 + Math.random() * 900000)}`
  } = location.state || {};

  // Format the date nicely
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="lottie-container1">
          <Lottie 
            animationData={check} 
            style={{ width: 100, height: 100 }} // Adjust size here
          />
        </div>

        <h1 className="thank-you-title">Thank You!</h1>
        <p className="appointment-success">
          Your Appointment Was Booked Successfully
        </p>

        <div className="appointment-details">
          <p>
            You booked an appointment with <strong>{doctorName}</strong>
          </p>
          <p>
            on <strong>{formattedDate}</strong>, at <strong>{time}</strong>
          </p>
          <p>
            Reservation Number: <strong>{reservationNumber}</strong>
          </p>
          <p>
            Total cost: <strong>{cost}</strong>
          </p>
        </div>

        <div className="divider"></div>

        <Link to="/"> <button className="done-button"> Done </button></Link>
      </div>
    </div>
  );
};

export default Confirmation;