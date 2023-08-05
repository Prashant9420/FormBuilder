import React, { useState, useRef, useEffect } from "react";
import "./Cloze.css";

const Cloze = ({setFinalForm}) => {
  const [sentence, setSentence] = useState("");
  const [options, setOptions] = useState([]);
  const newOptionInputRef = useRef(null);
  // eslint-disable-next-line

  const handleSentenceChange = (e) => {
    const value = e.target.value;
    setSentence(value);
  };

  const handleAddOption = () => {
    const inputValue = newOptionInputRef.current.value.trim();
    if (inputValue !== "") {
      setOptions((prevOptions) => [...prevOptions, inputValue]);
      setFinalForm((prevState) => ({
        ...prevState,
        cloze:{sentence:sentence,options:[...options,inputValue]}
      }))
      newOptionInputRef.current.value = "";
    }
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if the user presses "Ctrl+U" and a word is selected in the sentence
      if (e.ctrlKey && e.key === "u" && window.getSelection().toString()) {
        e.preventDefault();
        const selectedWord = window.getSelection().toString();
        // if (!blanks.includes(selectedWord)) {
        //   setOptions((prevOptions) => [...prevOptions, selectedWord]);
        // }
        console.log(selectedWord)
        if (!options.includes(selectedWord)) {
          
          console.log(options)
          setOptions((prevOptions)=>[...prevOptions, selectedWord]);
          setFinalForm((prevState) => ({
            ...prevState,
            cloze:{sentence:sentence,options:[...options,selectedWord]}
          }))
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  } );

  return (
    <div className="cloze-main my-5">
      <h2><u>Question 2</u></h2>
      <div className="cloze-section my-4">
        <label htmlFor="sentence">Sentence:</label>
        <textarea
          id="sentence"
          value={sentence}
          onChange={handleSentenceChange}
          placeholder="Type the full sentence or paragraph normally"
        ></textarea>
        <h3 className="my-3">Options</h3>
        <div className="options-container">
          {options.map((option) => (
            <div key={option} className="option my-3">
              <p>{option}</p>
            
            </div>
          ))}
        </div>
        <div className="add-option my-2">
          <input
            id="box"
            type="text"
            ref={newOptionInputRef}
            placeholder="Enter a new option"
          />
          <br></br>
          <button className="my-3" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cloze;