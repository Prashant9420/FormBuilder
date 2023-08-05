import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Render.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import SERVER_URL from "./server_url";

const Render = () => {
  const [formData, setFormData] = useState();
  const [categoryAnswers, setCategoryAnswers] = useState({});
  const [clozeSentenceArr, setClozeSentenceArr] = useState([]);
  const [comprehensionAnswers, setComprehensionAnswers] = useState({});
  const [progressChk, setProgressChk] = useState(false);

  const navigate=useNavigate();
  const { id,view } = useParams();
  useEffect(() => {
    const fetchFormData = async () => {
      setProgressChk(true);
      try {
        const response = await axios.post(`${SERVER_URL}/getForm`,{id:id});
        console.log(response);
        setFormData(response.data);
        
        if(response.data.Cloze[0].sentence){setClozeSentenceArr(response.data.Cloze[0].sentence.split(" "));}
        if(response.data.Category.length>0){response.data.Category.map((cat, ind) => {
          console.log(cat.item, response.data.Category[ind].category);
          setCategoryAnswers((prevState) => ({
            ...prevState,
            [cat.item]: response.data.Category[ind].category,
          }));
        });}
        setFormedSentence(response.data.Cloze[0].sentence);
        if(response.data.Comprehension){response.data.Comprehension.map((ques, ind) => {
          console.log(ques.question);
          setComprehensionAnswers((prevState) => ({
            ...prevState,
            [ques.question]:null,
          }));
        });}
        setProgressChk(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setProgressChk(false);
      }
    };

    fetchFormData();
  }, []);
  const handleSubmitForm=async()=>{
    const allAnswers={
      category:categoryAnswers,
      cloze:formedSentence,
      comprehension:comprehensionAnswers
    }
    const resp=await fetch(`${SERVER_URL}/submitForm`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(allAnswers)
    })
    const data=await resp.json();
    setIsSubmitted(true);
    console.log(data.mess,"form submitted successfully")
  }
  const [formedSentence, setFormedSentence] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (question, selectedOption) => {
    setComprehensionAnswers((prevState) => ({
      ...prevState,
      [question]:selectedOption,
    }));
  };
  const handleCategoryAnswers = (e, ind) => {
    console.log(e.target.value);
    console.log(ind.item);
    setCategoryAnswers((prevState) => ({
      ...prevState,
      [ind.item]: e.target.value,
    }));
  };
  const handleSelectChange = (event, word, index) => {
    const updatedSentenceArr = [...clozeSentenceArr];
    updatedSentenceArr[index] = event.target.value;
    setClozeSentenceArr(updatedSentenceArr);
    setFormedSentence(updatedSentenceArr.join(" "));
  };
  return (
    <div className="form-container my-2">
      {(view==='true' && !isSubmitted)?<button style={{marginRight:'1600px'}} onClick={()=>navigate('/')}> back</button>:null}
      {(progressChk)?<CircularProgress/>:null}
      {(formData)&& !isSubmitted && formData.imgUrl&&(<img style={{width:'100%',height:'300px',marginTop:'20px',objectFit:'cover'}} src={formData.imgUrl}></img>)}
        <div className="form-part my-5">
          {!isSubmitted && formData && formData.Category.length>0 && (
            <div className="category my-4">
              <h2>Category</h2>
              <ul className="categoryList">
                {formData.Category.map((categoryItem, ind) => (
                  <div key={categoryItem._id} className="category-item">
                    <p>Item: {categoryItem.item}</p>
                    <label htmlFor={`category-select-${categoryItem._id}`}>
                      Select Category:
                    </label>
                    <select
                      id={`category-select-${categoryItem._id}`}
                      onChange={(event) =>
                        handleCategoryAnswers(event, categoryItem)
                      }
                    >
                      {formData.Category.map((categoryOption) => (
                        <option
                          key={categoryOption._id}
                          value={categoryOption.category}
                        >
                          {categoryOption.category}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </ul>
            </div>
          )}

          {!isSubmitted && formData && formData.Cloze[0].sentence && (
            <div className="cloze-container">
              {" "}
              <h2>Cloze</h2>{" "}
              <h3 className="cloze-sentence"><b>Question:</b> 
                {clozeSentenceArr.map((word, ind) => {
                  return (
                    <span className="word">
                      {!formData.Cloze[0].words.includes(word) ? (
                        word
                      ) : (
                        <select
                          onChange={(event) =>
                            handleSelectChange(event, word, ind)
                          }
                        >
                          {" "}
                          {formData.Cloze[0].words.map((option, index) => (
                            <option key={index}>{option}</option>
                          ))}{" "}
                        </select>
                      )}
                    </span>
                  );
                })}
              </h3>{" "}
              <div>
                <h3>Formed Sentence:</h3>
                <p>{formedSentence}</p>
              </div>
            </div>
          )}
          {!isSubmitted && formData && formData.Comprehension && (<div className="comprehension main">
          <h2 style={{ fontWeight: "bold" }}>Comprehension</h2>
          <p className="passage">{formData.Comprehension.passage}</p>
          {formData.Comprehension.map((question, questionIndex) => (
            <div className="comprehension my-5" key={questionIndex}>
              <p style={{ color: "purple" }}>
                Question {questionIndex + 1 + ": " + question.question}
              </p>
              <div>select an option: </div>
              <div className="some">
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label>
                  
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          // checked={formData.selectedOption === optionIndex}
                          onChange={() =>
                            handleSelectOption(question.question, option)
                          }
                        />
                        {" " + option}
                      </label>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ))}</div>)}
        </div>
       {(view==='false' && !isSubmitted)?<button className="btn btn-info my-3" onClick={handleSubmitForm} >
        Submit Form
      </button>:null}
      {(isSubmitted)&&(
        <div>
        <h1>
          Thank You
        </h1>
        <h6>Your Responsed have been saved in the database</h6>
      </div>
      )}
    </div>
  );
};

export default Render;
