import { Link } from "react-router-dom";

const QuestionnairesNewJob = () => {
  return (
    <div className="mb-4">
      <label
        htmlFor="jobLocation"
        className="block text-left text-lg font-medium mb-2"
      >
        Add or create questionnaire
      </label>

      <div>
        <Link to="/company-dashboard/questionnaires" className="border m-3 p-2">
          Choose ready questionnaire
        </Link>
        <Link
          to="/company-dashboard/new-questionnaire"
          className="border m-3 p-2"
        >
          Create new questionnaire
        </Link>
      </div>
    </div>
  );
};

export default QuestionnairesNewJob;
