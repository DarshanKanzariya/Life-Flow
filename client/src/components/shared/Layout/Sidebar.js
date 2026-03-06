import React from "react";
//import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);
  console.log("SIDEBAR USER:", user);

  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <h1 style={{ color: "white" }}>Sidebar Working</h1>
        <div className="menu">
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donor" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donor">Donor</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/user" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/user">User</Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/user-list" && "active"
                }`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/user-list">User List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donor-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/donor-list">Donor List</Link>
              </div>
            </>
          )}
          {(user?.role === "donor" || user?.role === "user") && (
            <div
              className={`menu-item ${
                location.pathname === "/hospital" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/hospital">hospital</Link>
            </div>
          )}
          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}
          {user?.role === "donor" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
