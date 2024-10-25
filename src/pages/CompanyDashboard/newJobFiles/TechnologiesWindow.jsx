const TechnologiesWindow = ({
  jobKindsIndex,
  jobKinds,
  newJob,
  addTechnology,
  setToggleWindow,
  closeTechnologyWindow,
}) => {
  return (
    <div
      className="w-3/4 h-3/4 rounded-3xl z-10 fixed bg-white left-1/2 top-1/2 border border-black flex flex-col"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <button
        className="flex justify-start text-lg ml-5 p-1 border w-5"
        onClick={closeTechnologyWindow}
      >
        X
      </button>
      <p className="block text-lg font-medium mb-2 text-center">
        Select required skills
      </p>
      <div className="m-5 flex flex-wrap justify-center">
        {jobKinds[jobKindsIndex].kinds.map((jobKind, index) => (
          <div
            key={index}
            className="m-5 border rounded-2xl p-3 border-black cursor-pointer"
            onClick={() => {
              addTechnology(jobKind);
            }}
            style={
              newJob.technologiesStack.includes(jobKind)
                ? { backgroundColor: "green" }
                : {}
            }
          >
            {jobKind}
          </div>
        ))}
      </div>

      <button className="p-3 border-black border" onClick={setToggleWindow}>
        Submit technologies
      </button>
    </div>
  );
};

export default TechnologiesWindow;
