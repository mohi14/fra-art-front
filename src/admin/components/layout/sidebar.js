import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoDark, logoLight } from "../../../utils/images.util";
function Sidebar() {
  const location = useLocation();

  return (
    <>
      <div className="sidebar">
        <div className="brand-logo">
          <Link to="/" className="full-logo">
            {/* <img src="/images/logoi.png" alt="" width="30" /> */}
            <img src="/images/logoDeshboard.png" alt="" width="30" />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li className={location == "/admin" ? "active" : ""}>
              <Link to="/admin/">
                <span>
                  <i className="ri-layout-grid-fill"></i>
                </span>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className={location == "/admin/bids" ? "active" : ""}>
              <Link to="/admin/bids">
                <span>
                  <i className="ri-briefcase-line"></i>
                </span>
                <span className="nav-text">Bids</span>
              </Link>
            </li>
            <li className={location == "/admin/saved" ? "active" : ""}>
              <Link to="/admin/saved">
                <span>
                  <i className="ri-heart-line"></i>
                </span>
                <span className="nav-text">Saved</span>
              </Link>
            </li>
            <li className={location == "/admin/collections" ? "active" : ""}>
              <Link to="/admin/collections">
                <span>
                  <i className="ri-star-line"></i>
                </span>
                <span className="nav-text">Collection</span>
              </Link>
            </li>
            <li
              className={location == "/admin/settings-profile" ? "active" : ""}
            >
              <Link to="/admin/settings-profile">
                <span>
                  <i className="ri-settings-3-line"></i>
                </span>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="card-limit-progress">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="flex-grow-2 me-3">
              <div className="d-flex justify-content-between mb-1">
                <h5 className="mb-1">Visa</h5>
                <p className="mb-0">
                  <strong>75% </strong>
                </p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-light"
                  role="progressbar"
                  style={{
                    width: "75%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="flex-grow-2 me-3">
              <div className="d-flex justify-content-between mb-1">
                <h5 className="mb-1">Master</h5>
                <p className="mb-0">
                  <strong>65% </strong>
                </p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-white"
                  role="progressbar"
                  style={{
                    width: "65%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="flex-grow-2 me-3">
              <div className="d-flex justify-content-between mb-1">
                <h5 className="mb-1">Paypal</h5>
                <p className="mb-0">
                  <strong>50% </strong>
                </p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-white"
                  role="progressbar"
                  style={{
                    width: "50%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="flex-grow-2 me-3">
              <div className="d-flex justify-content-between mb-1">
                <h5 className="mb-1">Amex</h5>
                <p className="mb-0">
                  <strong>20% </strong>
                </p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-white"
                  role="progressbar"
                  style={{
                    width: "20%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
