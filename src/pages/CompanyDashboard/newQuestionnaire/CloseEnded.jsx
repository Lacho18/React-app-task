import { useState } from "react";

const CloseEnded = ({ addQuestionFunction, type }) => {
  //State that stores the number of answers in the question
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  //The structure of the question
  //If the question is "Closed-ended" the correctAnswer field is number. If not it is array of numbers
  const [questionStructure, setQuestionStructure] = useState({
    questionText: "",
    answers: [],
    correctAnswer: type === "Closed-ended questions" ? 0 : [],
    type: type,
  });
  //State for error messages
  const [error, setError] = useState("");

  //Function that handles every changes in the fields
  function inputFieldsChanges(e) {
    if (e.target.id === "correctAnswer") {
      if (e.target.value > numberOfAnswers || e.target.value < 0) {
        setError(
          "The answers are " +
            numberOfAnswers +
            ". The provided answer " +
            e.target.value +
            " is not a valid answer!"
        );
        setTimeout(() => setError(""), 7000);
        return;
      }
    }
    setQuestionStructure((oldStructure) => {
      return { ...oldStructure, [e.target.id]: e.target.value };
    });
  }

  //Function that adds answers
  function addAnswer(e, index) {
    setQuestionStructure((oldValue) => {
      let answersArray = oldValue.answers;

      if (answersArray.length === 0) {
        answersArray = Array(numberOfAnswers).fill("");
      }

      if (e.target.id === "correctAnswer") {
        answersArray[index] = e.target.value - 1;
      } else {
        answersArray[index] = e.target.value;
      }

      return { ...oldValue, answers: answersArray };
    });
  }

  //Function that handles the multiple choices answers
  function multipleChoicesAnswer(index) {
    setQuestionStructure((oldValue) => {
      if (Array.isArray(oldValue.correctAnswer)) {
        let newCorrectAnswer = [...oldValue.correctAnswer];

        if (newCorrectAnswer.includes(index)) {
          newCorrectAnswer = newCorrectAnswer.filter((item) => item !== index);
        } else {
          newCorrectAnswer.push(index);
        }

        return { ...oldValue, correctAnswer: newCorrectAnswer };
      }

      return { ...oldValue };
    });
  }

  //Function that adds the question to the array of questions
  function submitHandler(e) {
    e.preventDefault();

    const keys = Object.keys(questionStructure);

    //Check for empty fields
    let emptyFields = false;
    keys.forEach((key) => {
      if (
        questionStructure[key] === "" ||
        questionStructure[key] === 0 ||
        (Array.isArray(questionStructure[key]) &&
          questionStructure[key].length === 0)
      ) {
        emptyFields = true;
      }
    });

    if (emptyFields) {
      setError("All fields are required!");
      setTimeout(() => setError(""), 3000);

      return;
    }

    //Checks if the number of the correct answer is valid number
    if (questionStructure.type === "Closed-ended questions") {
      if (
        questionStructure.correctAnswer > numberOfAnswers ||
        questionStructure.correctAnswer < 0
      ) {
        setError(
          "The answers are " +
            numberOfAnswers +
            ". The provided answer " +
            questionStructure.correctAnswer +
            " is not a valid answer!"
        );
        setTimeout(() => setError(""), 7000);
        return;
      }
    }

    addQuestionFunction(questionStructure);
  }

  return (
    <div className="">
      {error !== "" && (
        <p className="text-2xl text-red-500 font-bold fixed left-8 w-32">
          {error}
        </p>
      )}
      <form className="max-w-lg mx-auto" onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            htmlFor="name"
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
            htmlFor="name"
            className="block text-left text-lg font-medium mb-2"
          >
            Enter number of answers
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Num of answers"
            required
            onChange={(e) => setNumberOfAnswers(e.target.value)}
          />
        </div>

        {numberOfAnswers > 0 && (
          <div>
            {Array.from({ length: numberOfAnswers }).map((_, index) => {
              return (
                <div key={index} className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-left text-lg font-medium mb-2"
                  >
                    Answer {index + 1}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded"
                    placeholder={"Answer " + (index + 1)}
                    required
                    onChange={(e) => addAnswer(e, index)}
                  />
                </div>
              );
            })}
            {type === "Closed-ended questions" ? (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-left text-lg font-medium mb-2"
                >
                  Write the number of the correct answer
                </label>
                <input
                  id="correctAnswer"
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="Answer number"
                  required
                  onChange={inputFieldsChanges}
                />
              </div>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-left text-lg font-medium mb-2"
                >
                  Select the numbers of the correct answers
                </label>

                <div className="flex justify-center">
                  {Array.from({ length: numberOfAnswers }).map((_, index) => {
                    return (
                      <div
                        className="text-xl p-3 m-2 border cursor-pointer"
                        onClick={() => multipleChoicesAnswer(index)}
                        style={
                          questionStructure.correctAnswer.includes(index)
                            ? { backgroundColor: "green" }
                            : {}
                        }
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="bg-[#08075F] text-white rounded border-black p-3"
            >
              Submit question
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CloseEnded;
