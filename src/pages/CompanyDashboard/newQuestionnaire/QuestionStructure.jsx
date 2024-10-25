const QuestionStructure = ({ question, closeQuestionWindow }) => {
  //Component that shows the structure of a question
  if (question.type === "Closed-ended questions") {
    return (
      <div
        className="w-3/4 h-3/4 rounded-3xl z-10 fixed bg-white left-1/2 top-1/2 border border-black flex flex-col justify-center items-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <button
          className="bg-red-500 w-8 h-8 rounded-full text-xl absolute left-3 top-3"
          onClick={closeQuestionWindow}
        >
          X
        </button>
        <div className="flex flex-col items-start">
          <p className="text-sm italic">{question.type}</p>
          <p className="text-lg font-bold">{question.questionText}</p>
          {question.answers.map((answer, index) => (
            <div className="p-1">
              <input
                type="radio"
                checked={index === question.correctAnswer - 1}
              />
              <label className="ml-1">{answer}</label>
            </div>
          ))}

          <p className="pt-1 pb-1">
            The correct answer is{" "}
            <span className="font-bold">{question.correctAnswer}</span>
          </p>
          <p>
            Answer:{" "}
            <span className="font-bold">
              {question.answers[question.correctAnswer - 1]}
            </span>
          </p>
        </div>
      </div>
    );
  } else if (question.type === "Multiple choices") {
    return (
      <div
        className="w-3/4 h-3/4 rounded-3xl z-10 fixed bg-white left-1/2 top-1/2 border border-black flex flex-col justify-center items-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <button
          className="bg-red-500 w-8 h-8 rounded-full text-xl absolute left-3 top-3"
          onClick={closeQuestionWindow}
        >
          X
        </button>
        <div className="flex flex-col items-start">
          <p className="text-sm italic text-left">{question.type}</p>
          <p className="text-lg font-bold">{question.questionText}</p>
          <div className="flex flex-col items-left m-3">
            {question.answers.map((answer, index) => (
              <div className="self-start">
                <input
                  type="checkbox"
                  checked={question.correctAnswer.includes(index)}
                />
                <label className="ml-1">{answer}</label>
              </div>
            ))}
          </div>

          <p>
            The correct answers are{" "}
            <span className="font-bold">
              {question.correctAnswer.join(", ")}
            </span>
          </p>
          <p className="self-start">
            Answers:{" "}
            <span className="font-bold">
              {question.answers[question.correctAnswer - 1]}
              {question.answers
                .filter((_, index) => question.correctAnswer.includes(index))
                .map((answer) => (
                  <p>{answer}</p>
                ))}
            </span>
          </p>
        </div>
      </div>
    );
  } else if (question.type === "Open-ended questions") {
    return (
      <div
        className="w-3/4 h-3/4 rounded-3xl z-10 fixed bg-white left-1/2 top-1/2 border border-black flex flex-col justify-center items-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <button
          className="bg-red-500 w-8 h-8 rounded-full text-xl absolute left-3 top-3"
          onClick={closeQuestionWindow}
        >
          X
        </button>
        <div className="flex flex-col">
          <p className="text-sm italic">{question.type}</p>
          <p className="text-lg font-bold">{question.questionText}</p>

          <div className="pt-5 pb-5">
            <p>Key words in answer:</p>
            <p className="font-bold">{question.keyWords.join(", ")}</p>
          </div>
          <p>
            Number of key words that has to appear in users answer :{" "}
            <span className="font-bold">{question.correctKeywords}</span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="w-3/4 h-3/4 rounded-3xl z-10 fixed bg-white left-1/2 top-1/2 border border-black flex flex-col justify-center items-center"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <button
          className="bg-red-500 w-8 h-8 rounded-full text-xl absolute left-3 top-3"
          onClick={closeQuestionWindow}
        >
          X
        </button>
        Unsupported question type -{" "}
        <span className="font-bold">{question.type}</span>
      </div>
    );
  }
};

export default QuestionStructure;
