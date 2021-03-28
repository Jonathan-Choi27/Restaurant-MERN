import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";

import { showErrorMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import { signin } from "../api/auth";

const Signin = () => {
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  /*****************************
   * EVENT HANDLERS
   *****************************/
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client-side validation
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("Redirecting to admin dashboard");
            history.push("/admin/dashboard");
          } else {
            console.log("Redirecting to user dashboard");
            history.push("/user/dashboard");
          }
        })
        .catch((err) => {
          console.log("signin api function error: ", err);
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
  const showSigninForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
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

      <div className="d-grid gap-2 mb-2">
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </div>
      <p className="text-center text-white">
        Don't have an account?{" "}
        <Link className="text-center text-decoration-none" to="/signup">
          Sign Up
        </Link>
      </p>
    </form>
  );

  /*****************************
   * RENDERER
   *****************************/
  return (
    <div className="signin-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSigninForm()}
        </div>
      </div>
    </div>
  );
};

export default Signin;
