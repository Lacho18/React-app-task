import { useEffect, useState } from "react";
import jobKinds from "./jobKinds";
import { useNavigate } from "react-router-dom";
import TechnologiesWindow from "./TechnologiesWindow";
import JobDescription from "./JobDescription";
import QuestionnairesNewJob from "./QuestionnairesNewJob";
import { usePostNewJobApplicationMutation } from "../../../features/auth/authApiSlice";
import { useSelector } from "react-redux";

const NewJob = () => {
  const jobCategories = [
    {
      category: "IT",
      jobKinds: [
        "Backend Development",
        "Frontend Development",
        "Full stack Development",
        "Infrastructure",
        "Mobile Development",
        "Quality Assurance",
        "Data Science",
      ],
    },
    {
      category: "MARKETING",
      jobKinds: ["SALES", "Sales Representative", "Office Associate"],
    },
    {
      category: "Tourism",
      jobKinds: [
        "Sales Consultant",
        "Corporate Sales Manager",
        "Trade Representative",
      ],
    },
  ];

  const navigate = useNavigate();
  //State that follows the selected job category
  const [categoryIndex, setCategoryIndex] = useState(0);
  //State that follows the selected job kinds in order to visualize the correct Tech stack from the jobKinds array
  const [jobKindsIndex, setJobKindsIndex] = useState(0);
  //State that follows whether the window for technologies is shown or not
  const [toggleWindow, setToggleWindow] = useState(false);
  //State for error messages
  const [error, setError] = useState("");
  //Information for the user
  const userInfo = useSelector((state) => state.auth.userInfo);

  //Function that sends the newHob object to the api
  const [newJobFunction] = usePostNewJobApplicationMutation();

  //New job main object
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    jobCategory: jobCategories[0].category,
    jobKind: jobCategories[0].jobKinds[0],
    jobLevel: "Junior",
    jobLocation: "Remote",
    technologiesStack: [],
    jobDescription: "",
    //The id of the questionnaire in the database
    jobQuestions: 2,
  });

  //Shows window if the user tries to refresh the page, that warns him that the form data will be lost
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      //Triggers the standard browser alert dialog
      event.returnValue = "";
    };

    // Add the event listener for the 'beforeunload' event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //Handles changes on input and select tags
  function changeFieldsHandler(e) {
    if (e.target.id === "jobCategory") {
      setCategoryIndex(e.target.selectedIndex);
      //Sets the selected category and clears the technologies if any
      setNewJob((oldValue) => {
        return {
          ...oldValue,
          [e.target.id]: e.target.value,
          technologiesStack: [],
        };
      });

      return;
    }
    if (e.target.id === "jobKind") {
      let indexOfJobKind = jobKinds.findIndex(
        (value) => value.category === e.target.value
      );
      setJobKindsIndex(indexOfJobKind);
      //Sets the selected job kind and clears the technologies if any
      setNewJob((oldValue) => {
        return {
          ...oldValue,
          [e.target.id]: e.target.value,
          technologiesStack: [],
        };
      });

      return;
    }
    //Set the changes in the main object
    setNewJob((oldValue) => {
      return { ...oldValue, [e.target.id]: e.target.value };
    });
  }

  //Adds or remove technology to technologiesStack array
  function addTechnology(tech) {
    setNewJob((oldValue) => {
      //Checks if the technology is already added
      const techExists = oldValue.technologiesStack.includes(tech);
      const updatedStack = techExists
        ? oldValue.technologiesStack.filter((item) => item !== tech)
        : [...oldValue.technologiesStack, tech];

      return { ...oldValue, technologiesStack: updatedStack };
    });
  }

  //Closes the window that appears when "Choose tech stack" button is clicked
  function closeTechnologyWindow() {
    if (toggleWindow) {
      setToggleWindow(false);
      if (newJob.technologiesStack.length > 0) {
        setNewJob((oldValue) => {
          oldValue.technologiesStack = [];

          return { ...oldValue };
        });
      }
    }
  }

  //Submits the new job and sends it to the server
  async function submitHandler(e) {
    e.preventDefault();

    if (userInfo?.user_type === "company") {
      const keys = Object.keys(newJob);

      let emptyField = false;

      console.log(newJob);

      keys.forEach((key) => {
        if (
          newJob[key] === "" ||
          newJob[key] === -1 ||
          (Array.isArray(newJob[key]) && newJob[key].length === 0)
        ) {
          emptyField = true;
        }
      });

      if (emptyField) {
        setError("All fields are required!");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      //Function from authApiSlice.jsx
      await newJobFunction(newJob);

      setError("Job posted successfully");
      setTimeout(() => {
        navigate("/company-dashboard");
      }, 3000);
    }
  }

  return (
    <div className="bg-gray-100 text-[#08075F]" onClick={closeTechnologyWindow}>
      <main
        className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {error !== "" && (
          <p className="text-xl text-red-500 font-bold fixed left-18">
            {error}
          </p>
        )}
        <h1 className="text-4xl font-bold mb-8">Create new job</h1>

        <form className="max-w-lg mx-auto" onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-left text-lg font-medium mb-2"
            >
              Job title
            </label>
            <input
              type="text"
              id="jobTitle"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter job title"
              required
              onChange={changeFieldsHandler}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobCategory"
              className="block text-left text-lg font-medium mb-2"
            >
              Job category
            </label>

            <select
              id="jobCategory"
              className="w-full p-3 rounded border"
              onChange={changeFieldsHandler}
            >
              {jobCategories.map((category, index) => (
                <option key={index}>{category.category}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobKind"
              className="block text-left text-lg font-medium mb-2"
            >
              Job kind
            </label>
            <select
              id="jobKind"
              className="w-full p-3 rounded border"
              onChange={changeFieldsHandler}
            >
              {jobCategories[categoryIndex].jobKinds.map((kind, index) => (
                <option key={index}>{kind}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobLevel"
              className="block text-left text-lg font-medium mb-2"
            >
              Job level
            </label>
            <select
              id="jobLevel"
              className="w-full p-3 rounded border"
              onChange={changeFieldsHandler}
            >
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobLocation"
              className="block text-left text-lg font-medium mb-2"
            >
              Job location
            </label>
            <select
              id="jobLocation"
              className="w-full p-3 rounded border"
              onChange={changeFieldsHandler}
            >
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On side</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="jobLocation"
              className="block text-left text-lg font-medium mb-2"
            >
              Tech stack
            </label>
            {newJob.technologiesStack.length > 0 && (
              <div className="flex">
                {newJob.technologiesStack.map((technology) => (
                  <div
                    key={technology}
                    className="m-5 border rounded-2xl p-1 border-black cursor-pointer"
                  >
                    {technology}
                  </div>
                ))}
              </div>
            )}
            <button
              className="border p-3 border-black"
              type="button"
              onClick={() => setToggleWindow(true)}
            >
              Choose tech stack
            </button>
          </div>

          <JobDescription
            changeFieldsHandler={changeFieldsHandler}
            jobDescription={newJob.jobDescription}
          />

          <QuestionnairesNewJob />

          <button
            type="submit"
            className="bg-[#08075F] text-white rounded border-black p-3 mt-3"
          >
            Submit new job
          </button>
        </form>

        {toggleWindow && (
          <TechnologiesWindow
            jobKindsIndex={jobKindsIndex}
            jobKinds={jobKinds}
            newJob={newJob}
            addTechnology={addTechnology}
            setToggleWindow={() => setToggleWindow(false)}
            closeTechnologyWindow={closeTechnologyWindow}
          />
        )}
      </main>
    </div>
  );
};

export default NewJob;
