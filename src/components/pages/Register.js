import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import logo from "../assets/logo.jpg";
function Register({ user }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobno, setMobno] = useState("");
  const [password, setPassword] = useState("");
  const [person, setPerson] = useState(user);

  const signup = (e) => {
    e.preventDefault();
    axios
      .post("/signup", {
        name: name,
        email: email,
        pno: mobno,
        password: password,
        mode: person,
      })
      .then(function (response) {
        alert("You are registered");

        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setEmail("");
    setName("");
    setMobno("");
    setPassword("");
    history.push("/");
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" src={logo} />
      </Link>
      <div className="login_container">
        <h1>Sign-Up</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h5>Mob No</h5>
          <input
            type="number"
            value={mobno}
            onChange={(e) => setMobno(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={signup} type="submit" className="login_signInButton">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
