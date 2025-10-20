import React from "react";
import logo from "/logo.png";
import flightIcon from "../../assets/material-symbols-flight.svg";
import hotelIcon from "../../assets/fluent-building-32-filled.svg";
import taxiIcon from "../../assets/bxs-taxi.svg";
import transportIcon from "../../assets/vector.svg";
import "./style.css";

const Box = ({ formData }) => {
  const formatDate = (str) => {
    try {
      const d = new Date(str);
      if (isNaN(d)) return str || "-";
      return d.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return str || "-";
    }
  };

  return (
    <div className="box">
      {/* Logo */}
      <img className="logo" alt="Vigovia Logo" src={logo} />

      {/* Hero gradient card */}
      <div className="hero-card">
        <p className="hero-greeting">Hi, Rahul!</p>
        <h2 className="hero-title">
          {formData?.tripTitle || "Trip Itinerary"}
        </h2>
        <p className="hero-subtitle">{formData?.duration || ""}</p>
        <div className="hero-icons">
          <img src={flightIcon} alt="Flight" />
          <img src={transportIcon} alt="Transport" />
          <img src={taxiIcon} alt="Taxi" />
          <img src={hotelIcon} alt="Hotel" />
        </div>
      </div>

      {/* Trip info strip */}
      <div className="trip-info">
        <div className="info-item">
          <span className="label">Departure From :</span>
          <span className="value">{formData?.departureCity || "-"}</span>
        </div>
        <div className="info-item">
          <span className="label">Departure :</span>
          <span className="value">{formatDate(formData?.departureDate)}</span>
        </div>
        <div className="info-item">
          <span className="label">Arrival :</span>
          <span className="value">{formatDate(formData?.arrivalDate || formData?.days?.[0]?.date)}</span>
        </div>
        <div className="info-item">
          <span className="label">Destination :</span>
          <span className="value">{formData?.arrivalCity || formData?.destination || "-"}</span>
        </div>
        <div className="info-item">
          <span className="label">No. Of Travellers :</span>
          <span className="value">{formData?.travelers || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default Box;