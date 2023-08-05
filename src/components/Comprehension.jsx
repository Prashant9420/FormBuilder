import React, { useState } from 'react';
import "./Comprehension.css";

const Comprehension = ({setFinalForm}) => {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        type: 'MCQ',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1,
      },
    ]);    
  };

  const handleQuestionChange = (index, property, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][property] = value;
    setQuestions(updatedQuestions);
    setFinalForm((prevState) => ({
      ...prevState,
      comprehension:{passage:passage,questions:updatedQuestions}
    }))
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
    setFinalForm((prevState) => ({
      ...prevState,
      comprehension:{passage:passage,updatedQuestions}
    }))
  };


  return (
    <div className="comprehension-container my-5">
      <h2><u>Question 3</u></h2>
        <div>
          <div className="passage-section">
            <h3>Passage</h3>
            <textarea
              value={passage}
              style={{width:'100%'}}
              onChange={(e) => setPassage(e.target.value)}
              placeholder="Enter the passage for the comprehension"
            ></textarea>
          </div>
          <div className="questions-section">
            <h3>Questions</h3>
            {questions.map((question, index) => (
              <div key={index} className="question">
                <h4>Question {index + 1}</h4>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                >
                  <option value="MCQ">MCQ</option>
                </select>
                <textarea
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  placeholder="Enter the question"
                ></textarea>
                <div>
                  <h5>Options</h5>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option">
                      <label>
                        Option {optionIndex + 1}:
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                        />
                      </label>
                    </div>
                  ))}
                  <label>
                    Correct Answer:
                    <select
                      value={question.correctAnswer}
                      onChange={(e) => handleQuestionChange(index, 'correctAnswer', parseInt(e.target.value))}
                    >
                      {question.options.map((_, optionIndex) => (
                        <option key={optionIndex} value={optionIndex}>
                          Option {optionIndex + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Points for the right answer:
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                  />
                </label>
              </div>
            ))}
            <button onClick={handleAddQuestion}>Add Question</button>
          </div>

        </div>

    </div>
  );
};

export default Comprehension; 