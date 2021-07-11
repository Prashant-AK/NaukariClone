import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useStateValue } from "../statemanagement/StateProvider";
const initialstate = {
  jobtitle: "",
  companyname: "",
  jobdes: "",
};

function AddPost() {
  const history = useHistory();
  const [{ usertoken }, dispatch] = useStateValue();
  const [data, setData] = useState(initialstate);
  const handleChange = (e) => {
    var { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const Register = (e) => {
    e.preventDefault();
    fetch("/createjob", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usertoken,
      },
      body: JSON.stringify({
        title: data.jobtitle,
        description: data.jobdes,
        duration: new Date(),
        companyname: data.companyname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.log(data.error);
        else {
          console.log("Post addes Succesfully");
          history.push("/displaypost");
        }
      });
  };
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Add Job Post</h1>
      <div className="self-align-center" style={{ marginTop: "40px" }}>
        <form onSubmit={Register}>
          <div class="form-group">
            <label for="formGroupExampleInput">Job Title</label>
            <input
              name="jobtitle"
              type="text"
              class="form-control"
              onChange={handleChange}
              placeholder="Enter job title"
              value={data.jobtitle}
            />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput">Company Name</label>
            <input
              name="companyname"
              type="text"
              class="form-control"
              onChange={handleChange}
              placeholder="Enter Company Name"
              value={data.companyname}
            />
          </div>
          {/* <div class="form-group">
            <label for="formGroupExampleInput">Recruiter Name</label>
            <input
              name="recname"
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              onChange={handleChange}
              placeholder="Enter Recruiter Name"
              value={data.recname}
            />
          </div> */}

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Job Description</label>
            <textarea
              onChange={handleChange}
              name="jobdes"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={data.jobdes}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            {" "}
            Add New Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
