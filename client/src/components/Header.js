import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import Logo from "../images/restaurant-icon.png";

const Header = ({ history }) => {
  const handleLogout = (evt) => {
    logout(() => {
      history.push("/signin");
    });
  };

  // Views
  const showNavigation = () => (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light">
        {!isAuthenticated() && (
          <Link to="/" className="navbar-brand">
            <img
              src={Logo}
              alt="Restaurant Logo"
              width="30"
              height="24"
              className="d-inline-block align-top"
            />
            &nbsp; Restaurant XYZ
          </Link>
        )}

        {isAuthenticated() && isAuthenticated().role === 0 && (
          <Link to="/user/dashboard" className="navbar-brand">
            <img
              src={Logo}
              alt="Restaurant Logo"
              width="30"
              height="24"
              className="d-inline-block align-top"
            />
            &nbsp; Restaurant XYZ
          </Link>
        )}

        {isAuthenticated() && isAuthenticated().role === 1 && (
          <Link to="/admin/dashboard" className="navbar-brand">
            <img
              src={Logo}
              alt="Restaurant Logo"
              width="30"
              height="24"
              className="d-inline-block align-top"
            />
            &nbsp; Restaurant XYZ - Admin Dashboard
          </Link>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#toggleMobileMenu"
          aria-controls="toggleMobileMenu"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="toggleMobileMenu">
          <ul className="navbar-nav ms-auto text-center">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="bi bi-house"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <i className="bi bi-pencil-square"></i> Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    <i className="bi bi-box-arrow-in-right"></i> Sign In
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/user/dashboard" className="nav-link">
                    <i className="bi bi-house"></i>
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link">
                    <i className="bi bi-house"></i>
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    to="/admin/dashboard"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );

  // Render
  return <header id="header">{showNavigation()}</header>;
};

export default withRouter(Header);
