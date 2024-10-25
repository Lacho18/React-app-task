import { useState } from "react";

const OpenEnded = ({ addQuestionFunction, type }) => {
  //Structure for open-ended question
  const [questionStructure, setQuestionStructure] = useState({
    questionText: "",
    keyWords: [],
    correctKeywords: 0,
    type: type,
  });

  //Function that handles every change in the fields
  function inputFieldsChanges(e) {
    setQuestionStructure((oldStructure) => {
      if (e.target.id === "keyWords") {
        let newKeyWords = e.target.value.split(",");

        return { ...oldStructure, keyWords: newKeyWords };
      }
      return { ...oldStructure, [e.target.id]: e.target.value };
    });
  }

  //Adds the question to the questions array
  function submitHandler(e) {
    e.preventDefault();

    addQuestionFunction(questionStructure);
  }

  return (
    <div>
      <form className="max-w-lg mx-auto" onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            htmlFor="questionText"
            className="block text-left text-lg font-medium mb-2"
          >
            Write the question here
          </label>
          <input
            id="questionText"
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Question"
            required
            onChange={inputFieldsChanges}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="keyWords"
            className="block text-left text-lg font-medium mb-2"
          >
            Write key words in the answer separated by ','
          </label>
          <input
            id="keyWords"
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Key words"
            required
            onChange={inputFieldsChanges}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="correctKeywords"
            className="block text-left text-lg font-medium mb-2"
          >
            Write the limit of key words that have to be in the answer in order
            to be considered correct
          </label>
          <input
            id="correctKeywords"
            type="number"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Number of key words"
            required
            onChange={inputFieldsChanges}
          />
        </div>

        <button
          type="submit"
          className="bg-[#08075F] text-white rounded border-black p-3"
        >
          Submit question
        </button>
      </form>
    </div>
  );
};

export default OpenEnded;
