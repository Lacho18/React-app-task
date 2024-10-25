import { useState } from "react";
import CloseEnded from "./CloseEnded";
import OpenEnded from "./OpenEnded";

const NewQuestion = ({ addQuestionFunction, closeNewQuestion }) => {
  //States that follow the selected type of a question
  const [questionType, setQuestionType] = useState("");
  return (
    <div>
      {questionType === "" ? (
        <div className="flex flex-col justify-center items-center">
          <p className="block text-left text-lg font-medium mb-2">
            Choose question type
          </p>
          <button
            className="border m-3 p-2"
            onClick={() => setQuestionType("Closed-ended questions")}
          >
            Closed-ended questions
          </button>
          <button
            className="border m-3 p-2"
            onClick={() => setQuestionType("Multiple choices")}
          >
            Multiple choices
          </button>
          <button
            className="border m-3 p-2"
            onClick={() => setQuestionType("Open-ended questions")}
          >
            Open-ended questions
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <p>
              Question type : <span className="font-bold">{questionType}</span>
            </p>
            <button className="text-3xl" onClick={closeNewQuestion}>
              {"<---"}
            </button>
          </div>
          {questionType === "Closed-ended questions" ? (
            <CloseEnded
              addQuestionFunction={addQuestionFunction}
              type={questionType}
            />
          ) : questionType === "Multiple choices" ? (
            <CloseEnded
              addQuestionFunction={addQuestionFunction}
              type={questionType}
            />
          ) : (
            <OpenEnded
              addQuestionFunction={addQuestionFunction}
              type={questionType}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NewQuestion;
