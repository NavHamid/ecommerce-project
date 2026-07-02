import React from "react";
import "./Logo.css";

export default function Logo({ light = true }) {
  return (
    <div className={`store-logo ${light ? "logo-light" : "logo-dark"}`}>
      <div className="logo-badge">
        <span>AS</span>
      </div>
      <div className="logo-text">
        <span className="logo-title">Aura Select</span>
        <span className="logo-subtitle">Premium Goods</span>
      </div>
    </div>
  );
}
