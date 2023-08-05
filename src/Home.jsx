import React, { useState } from "react";
import "./index.css";
import Category from "./components/Category";
import Comprehension from "./components/Comprehension";
import Cloze from "./components/Cloze";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import SERVER_URL from "./server_url";

const Home = () => {
  const navigate =useNavigate();

  const [finalForm, setFinalForm] = useState({
    formName:"",
    imgUrl:"",
    category: {},
    cloze: {},
    comprehension: {},
  });
  const handleSaveForm = async () => {
    if(!finalForm.formName){
      toast("form name not given")
      return;
    }
    console.log(finalForm);
    try {
      const resp = await fetch(`${SERVER_URL}/saveForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalForm),
      });
      const result = await resp.json();
      // setFinalForm(result);
      console.log(result);
      toast("saved Successfullly")
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{display:"flex",flexDirection:'column',alignItems:'center'}}>
      <div className="container">
        <h1>Build Your Form</h1>
        <input type="text" placeholder="Name your form" onChange={(e)=>{setFinalForm((prev)=>({...prev,formName:e.target.value}))}}></input>
        <input type="text" placeholder="Img URL" onChange={(e)=>{setFinalForm((prev)=>({...prev,imgUrl:e.target.value}))}}></input>
      </div>
      <Category key="category" setFinalForm={setFinalForm} />
      <Cloze key="cloze" setFinalForm={setFinalForm} />
      <Comprehension key="comprehension" setFinalForm={setFinalForm} />
      <button className="btn btn-info my-3" onClick={handleSaveForm}>
        Save Form{" "}
      </button>
    
    </div>
  );
};

export default Home;
