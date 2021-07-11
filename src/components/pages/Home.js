import React from "react";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../statemanagement/StateProvider";
function Home({ arr }) {
  const [{ usertoken }, dispatch] = useStateValue();
  const applyJob = (job) => {
    console.log(job);
    fetch("/applyingjob", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usertoken,
      },
      body: JSON.stringify({
        job_id: job.id,
        status: "pending",
        applied_when: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.log(data.error);
        else {
          console.log("job applied");
        }
      });
  };

  return (
    <div className="container">
      <div className="list">
        {arr?.map((res) => (
          <article key={uuidv4()} className="card">
            <div className="col align-self-start">
              <h2>
                <u>{res.title}</u>
              </h2>
              <h5>{res.name}</h5>
            </div>
            <div className="col align-self-start">
              <p>{res.description}</p>
            </div>
            {/* <div className="col align-self-start">
             <p>Recuiter name</p>
           </div> */}
            <div className="button align-self-end">
              <button onClick={() => applyJob(res)} className="btn btn-primary">
                Apply Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;
