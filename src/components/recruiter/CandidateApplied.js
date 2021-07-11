import React, { useState, useEffect } from "react";

import { useStateValue } from "../statemanagement/StateProvider";
function CandidateApplied() {
  const [{ usertoken, userDetails }, dispatch] = useStateValue();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/showappliedcandidate", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usertoken,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.job);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container" style={{ paddingBottom: "20px" }}>
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          boxShadow: "-2px 2px 5px 6px black",
          zIndex: "2px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Previous Posts
        </h1>
        {data ? (
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company Name</th>
                <th scope="col">Job Title</th>
                <th scope="col">Recruiter Name</th>
                <th scope="col">Job Description</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((res, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{res.name}</td>
                  <td>{res.title}</td>
                  <td>{userDetails.name}</td>
                  <td>{res.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 style={{ textAlign: "center" }}>No Jobs Applied by candidate</h1>
        )}
      </div>
    </div>
  );
}

export default CandidateApplied;
