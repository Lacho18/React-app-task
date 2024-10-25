import { useState } from "react";
import { Link } from "react-router-dom";

const JobDescription = ({ changeFieldsHandler, jobDescription }) => {
  const [showTextArea, setArea] = useState(false);
  return (
    <div className="mb-4">
      <label
        htmlFor="jobLocation"
        className="block text-left text-lg font-medium mb-2"
      >
        Job description
      </label>

      <div>
        <Link to="/company-dashboard/all-jobs" className="border m-3 p-2">
          Use ready template
        </Link>
        <button
          type="button"
          className="border m-3 p-2"
          onClick={() => setArea((oldValue) => !oldValue)}
        >
          {showTextArea ? "Hide" : "Write"} description
        </button>
      </div>
      {showTextArea && (
        <div>
          <textarea
            id="jobDescription"
            class="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08075F] focus:border-[#08075F] resize-none"
            placeholder="Enter your description here..."
            onChange={changeFieldsHandler}
            value={jobDescription}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
