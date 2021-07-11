import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/pages/Header";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import AddPost from "./components/recruiter/AddPost";
import DisplayPost from "./components/recruiter/DisplayPost";
import Register from "./components/pages/Register";
import JobsApplied from "./components/pages/JobsApplied";
import { useStateValue } from "./components/statemanagement/StateProvider";
import CandidateApplied from "./components/recruiter/CandidateApplied";
function App() {
  const [{ usertoken, userDetails }, dispatch] = useStateValue();
  const [val, setVal] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const userdet = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwt");
    if (userdet) {
      dispatch({
        type: "Set_User",
        user: token,
      });
      dispatch({
        type: "Set_User_Detail",
        userDetails: userdet,
      });
    } else {
      dispatch({
        type: "Set_User",
        user: null,
      });
    }
  }, []);
  const ChooseCategory = (e) => {
    if (e === "title" || e === "description" || e === "name") {
      if (val === "") return;

      fetch(`/${e}/${val}`)
        .then((res) => res.json())
        .then((res) => setJobs(res.job))
        .catch((err) => console.log(err));
    }
  };
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Header ChooseCategory={ChooseCategory} val={val} setVal={setVal} />
            <Home arr={jobs} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/addpost">
            <Header />
            <AddPost />
          </Route>
          <Route exact path="/displaypost">
            <Header />
            <DisplayPost />
          </Route>
          <Route exact path="/candregister">
            <Register user="candidate" />
          </Route>
          <Route exact path="/recregister">
            <Register user="recruiter" />
          </Route>
          <Route exact path="/candlogin">
            <Login user="candidate" />
          </Route>
          <Route exact path="/reclogin">
            <Login user="recruiter" />
          </Route>
          <Route exact path="/jobsapplied">
            <Header />
            <JobsApplied />
          </Route>
          <Route exact path="/candappjobs">
            <Header />
            <CandidateApplied />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
