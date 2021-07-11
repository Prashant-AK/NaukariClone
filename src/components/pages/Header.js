import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg";
// import { useStateValue } from "../../stateManagement/StateProvider";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { BsPersonSquare } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { useStateValue } from "../statemanagement/StateProvider";
function Header({ ChooseCategory, val, setVal }) {
  const [{ usertoken, userDetails }, dispatch] = useStateValue();
  const history = useHistory();
  // const [val, setVal] = useState();

  const setSearch = (e) => {
    // e.preventDefault();
    console.log(e);
  };
  const LogOut = () => {
    localStorage.clear();
    dispatch({
      type: "Set_User",
      user: null,
    });
    dispatch({
      type: "Set_User_Detail",
      userDetails: {
        email: "",
        name: "",
        phone: "",
        mode: "",
        id: "",
      },
    });
    history.push("/");
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={logo} />
      </Link>

      <div className="header_container">
        <div className="header_search">
          <InputGroup>
            <FormControl
              placeholder="Search jobs"
              aria-label="Search Job"
              aria-describedby="basic-addon2"
              onChange={(e) => setVal(e.target.value)}
              value={val}
            />

            <DropdownButton
              onClick={(e) => ChooseCategory(e.target.attributes[0].value)}
              as={InputGroup.Append}
              variant="outline-secondary"
              title="Choose"
              id="input-group-dropdown-2"
            >
              <Dropdown.Item value="title">Title</Dropdown.Item>
              <Dropdown.Item value="description">Description</Dropdown.Item>
              <Dropdown.Item value="name">Recruiter Name</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </div>
      </div>
      <div className="header_nav">
        {!usertoken ? (
          <>
            <Dropdown style={{ marginRight: "10px" }}>
              <Dropdown.Toggle
                // className="header_dropdown"
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  border: "none",
                }}
                id="dropdown-basic"
              >
                Sign In
              </Dropdown.Toggle>
              <Dropdown.Menu className="header_dropdown">
                <Dropdown.Item className="header_dropdown">
                  <Link
                    to="/candlogin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Candidate
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="header_dropdown">
                  <Link
                    to="/reclogin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Recruiter
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown style={{ marginRight: "10px" }}>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  border: "none",
                }}
                id="dropdown-basic"
              >
                Sign Up
              </Dropdown.Toggle>
              <Dropdown.Menu className="header_dropdown">
                <Dropdown.Item className="header_dropdown">
                  <Link
                    to="/candregister"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Candidate
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="header_dropdown">
                  <Link
                    to="/recregister"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Recruiter
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Dropdown style={{ marginRight: "10px" }}>
              <Dropdown.Toggle
                // className="header_dropdown"
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  border: "none",
                }}
                id="dropdown-basic"
              >
                <BsPersonSquare />
              </Dropdown.Toggle>
              <Dropdown.Menu className="header_dropdown">
                {userDetails.mode === "recruiter" ? (
                  <>
                    <Dropdown.Item className="header_dropdown">
                      <Link
                        to="/displaypost"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Jobs Posted
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="header_dropdown">
                      <Link
                        to="/candappjobs"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Who applied
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="header_dropdown">
                      <Link
                        to="/addpost"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Add Job Post
                      </Link>
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item className="header_dropdown">
                    <Link
                      to="/jobsapplied"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Jobs Applied
                    </Link>
                  </Dropdown.Item>
                )}
                <Dropdown.Item className="header_dropdown">
                  <Link
                    onClick={LogOut}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Log Out
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
