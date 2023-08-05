import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import SERVER_URL from "../server_url";

const Forms = () => {
  const deleteForm = async (id) => {
    try {
      await fetch(`${SERVER_URL}/deleteForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      toast("Form deleted successfully");
      getAllForms();
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]);
  const [progressChk, setProgressChk] = useState(false);
  const getAllForms = async () => {
    setProgressChk(true);
    try {
      const resp = await fetch(`${SERVER_URL}/getAllForms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setAllForms(data);
      setProgressChk(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllForms();
    
  }, []);
  return (
    <div className="album py-5 bg-light">
      <h1 style={{ margin: "50px 50px" }}>Your Forms..</h1>
      {progressChk ? (
        <CircularProgress style={{ marginLeft: "100px" }} />
      ) : null}
      <div className="container">
        {allForms.length > 0 || progressChk ? (
          <div className="row">
            {allForms.map((form) => {
              return (
                <div className="col-md-3">
                  <div className="card mb-4 box-shadow">
                    <img
                      className="card-img-top"
                      src={form.imgUrl}
                      alt=""
                      style={{
                        height: "225px",
                        width: "100%",
                        display: "block",
                      }}
                    />
                    <div className="card-body">
                      <p className="card-text">{form.formName}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => navigate(`/render/${form._id}/true`)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={async () => {
                              await navigator.clipboard.writeText(
                                `${window.location.origin}/render/${form._id}/false`
                              );
                              toast("link copied");
                            }}
                            // await  navigator.clipboard.writeText(`${window.location.origin}/render/${form._id}/false`);
                          >
                            Copy Form Link
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => deleteForm(form._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h2>you dont have any Forms</h2>
        )}
        <button onClick={() => navigate("/build")}>Build your Form</button>
      </div>
    </div>
  );
};

export default Forms;
