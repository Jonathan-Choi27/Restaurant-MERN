import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import equals from "validator/lib/equals";

import { isAuthenticated } from "../helpers/auth";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from "../api/auth";

const Signup = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;
  /*****************************
   * EVENT HANDLERS
   *****************************/
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });

      signup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  /*****************************
   * VIEWS
   *****************************/
  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-person"></i>
        </span>
        <input
          name="username"
          value={username}
          type="text"
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-envelope"></i>
        </span>
        <input
          name="email"
          value={email}
          type="email"
          className="form-control"
          placeholder="Email address"
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-lock"></i>
        </span>
        <input
          name="password"
          value={password}
          type="password"
          className="form-control"
          placeholder="Create password"
          onChange={handleChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bi bi-lock"></i>
        </span>
        <input
          name="password2"
          value={password2}
          type="password"
          className="form-control"
          placeholder="Confirm password"
          onChange={handleChange}
        />
      </div>

      <div className="d-grid gap-2 mb-1">
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </div>
      <p className="text-center text-white">
        Have an account?{" "}
        <Link className="text-decoration-none" to="/signin">
          Login
        </Link>
      </p>
    </form>
  );

  /*****************************
   * RENDERER
   *****************************/
  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSignupForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
