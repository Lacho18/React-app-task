import { useState } from "react";
import NewQuestion from "./NewQuestion";
import { usePostQuestionnaireMutation } from "../../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QuestionStructure from "./QuestionStructure";

const NewQuestionnaire = () => {
  //State that stores data for every created question
  const [allQuestions, setAllQuestions] = useState([]);
  //States that indicates wheatear the question is creating
  const [creatingQuestion, setCreatingQuestion] = useState(false);
  //State for error messages
  const [error, setError] = useState("");
  //States that points to selected question from the array of questions
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);

  const navigate = useNavigate();

  const [postQuestionnaire] = usePostQuestionnaireMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);

  //Function that adds question after it was submitted
  function addQuestion(questionObject) {
    setAllQuestions((oldValue) => {
      let newQuestions = [...oldValue, questionObject];

      return newQuestions;
    });

    setCreatingQuestion(false);
  }

  //Function that submits the data from the questions to the api
  async function createQuestionnaire() {
    if (userInfo?.user_type === "company") {
      if (allQuestions.length !== 0) {
        const result = await postQuestionnaire(allQuestions);
        setError("Questionnaire posted!");

        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        setError("Please add at least 1 question!");

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError("You have to log in ass company in order to do this operation!");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  //Function that is called after question is selected
  function selectQuestion(index) {
    setSelectedQuestionIndex(index);
  }

  //Function that is called after question window is closed
  function closeQuestionWindow() {
    setSelectedQuestionIndex(-1);
  }

  //Function that deletes question from the array
  function removeQuestionFromArray(e, index) {
    e.stopPropagation();
    setAllQuestions((oldValue) => {
      let newQuestions = [...oldValue];
      newQuestions.splice(index, 1);

      return newQuestions;
    });
  }

  return (
    <div className="bg-gray-100 text-[#08075F]">
      <main className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center">
        {error !== "" && (
          <p className="text-red-500 text-xl font-bold">{error}</p>
        )}
        <div>
          {!creatingQuestion ? (
            <p className="italic">Click add question to create new question</p>
          ) : (
            <div>
              <NewQuestion
                addQuestionFunction={addQuestion}
                closeNewQuestion={() => setCreatingQuestion(false)}
              />
            </div>
          )}
        </div>
        {!creatingQuestion && (
          <div className="flex justify-center m-3">
            {allQuestions.length > 0 ? (
              <div className="border-black border w-1/3 p-2">
                <p className="text-left font-bold">Current questions:</p>
                <div className="flex flex-col flex-wrap justify-start items-start ml-3">
                  {allQuestions.map((question, index) => {
                    return (
                      <div
                        className="flex justify-between w-full hover:bg-blue-100 rounded"
                        onClick={() => selectQuestion(index)}
                      >
                        <p className="m-2">
                          {index + 1}. {question.questionText}
                        </p>
                        <button
                          className="p-2 m-1 bg-red-500 rounded"
                          onClick={(e) => removeQuestionFromArray(e, index)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>No questions added so far</p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="border m-3 p-2"
          onClick={() => createQuestionnaire()}
        >
          Create questionnaire
        </button>
        <button
          type="button"
          className="border m-3 p-2"
          onClick={() => setCreatingQuestion(true)}
        >
          Add question
        </button>

        {selectedQuestionIndex !== -1 && (
          <QuestionStructure
            question={allQuestions[selectedQuestionIndex]}
            closeQuestionWindow={closeQuestionWindow}
          />
        )}
      </main>
    </div>
  );
};

export default NewQuestionnaire;
