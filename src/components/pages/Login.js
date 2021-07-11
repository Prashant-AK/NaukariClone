import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo.jpg";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { useStateValue } from "../statemanagement/StateProvider";
function Login({ user }) {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    console.log("button clicked", email, password, user);
    axios
      .post("signin", {
        email,
        password,
        mode: user,
      })
      .then((res) => {
        if (res.error) {
          // M.toast({html:res.error,classes:'#d32f2f red darken-2'})
          console.log(res.error);
        } else {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch({
            type: "Set_User",
            user: res.data.token,
          });
          dispatch({
            type: "Set_User_Detail",
            userDetails: res.data.user,
          });
          // M.toast({html:"User Signed In",classes:'#00e676 green accent-3'})
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" src={logo} />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>

        <form onSubmit={login}>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login_signInButton">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
