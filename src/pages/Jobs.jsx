import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Array example for job objects
const jobsExamples = [
  {
    jobTitle: "React Junior Developer",
    jobCategory: "IT",
    jobKind: "Frontend Development",
    jobLevel: "junior",
    jobLocation: "hybrid",
    technologiesStack: ["JavaScript", "React"],
    jobDescription: "A lot of text",
    //The id of the questionnaire in the database
    jobQuestions: 2,
  },
  {
    jobTitle: "JavaScript Junior Developer",
    jobCategory: "IT",
    jobKind: "Frontend Development",
    jobLevel: "junior",
    jobLocation: "remote",
    technologiesStack: ["JavaScript", "React", "Vue"],
    jobDescription: "A lot of text",
    jobQuestions: 2,
  },
  {
    jobTitle: "Angular Senior Developer",
    jobCategory: "IT",
    jobKind: "Frontend Development",
    jobLevel: "senior",
    jobLocation: "hybrid",
    technologiesStack: ["Angular"],
    jobDescription: "A lot of text",
    jobQuestions: 2,
  },
  {
    jobTitle: "JAVA Junior Developer",
    jobCategory: "IT",
    jobKind: "Backend Development",
    jobLevel: "junior",
    jobLocation: "remote",
    technologiesStack: ["Java", "Spring"],
    jobDescription: "A lot of text",
    //The id of the questionnaire in the database
    jobQuestions: 2,
  },
];

//Example array for categories and technologies
const jobTechnologies = [
  {
    category: "Backend Development",
    technologies: [
      "Java",
      "JavaScript",
      ".NET",
      "Spring",
      "PHP",
      "Python",
      "Node.js/Express.js",
    ],
  },
  {
    category: "Frontend Development",
    technologies: ["JavaScript", "React", "Angular", "Vue"],
  },
  {
    category: "Full stack Development",
    technologies: ["Java & Angular", "Java & React", "Java & Vue"],
  },
  {
    category: "Mobile Development",
    technologies: ["Android", "iOS"],
  },
];

const Jobs = () => {
  const { categoryParam, techParam } = useParams();

  //Parameter for selected category
  let modifiedCategoryParam = categoryParam;
  //Parameters (one or many) for selected technologies
  let modifiedTechParam = techParam === "null" ? null : techParam;
  if (modifiedTechParam) {
    if (modifiedTechParam.includes("&")) {
      modifiedTechParam = modifiedTechParam.split("&");
    }
  }

  const categoryObject = jobTechnologies.find((tech) =>
    tech.category.includes(categoryParam)
  );
  if (categoryObject === undefined) {
    modifiedCategoryParam = null;
  }
  //State that follows the selected filters
  const [filters, setFilters] = useState({
    jobLocation: [],
    jobLevel: [],
    jobTechnologies: Array.isArray(modifiedTechParam)
      ? modifiedTechParam
      : modifiedTechParam
      ? [modifiedTechParam]
      : [],
    jobCategory: modifiedCategoryParam !== null ? modifiedCategoryParam : "",
  });
  //State that follows the selected category of jobs in order to visualize the technologies
  const [jobCategoryIndex, setIndex] = useState(-1);
  //State for array of jobs. The data comes from the server
  const [jobsArray, setJobsArray] = useState([]);

  useEffect(() => {
    //Request to the api that gets data for the jobs from api/auth/jobs route
    async function getJobs() {
      const response = await fetch("http://localhost:3000/api/auth/jobs", {
        method: "GET",
        header: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setJobsArray(result.jobs);
    }

    //getJobs();
    //Sets the data of the jobs to the example array
    setJobsArray(jobsExamples);

    //If there is param in the url, which only can describe the category, apply the filters to it
    if (modifiedCategoryParam !== null) {
      let indexOfTechnologies = jobTechnologies.findIndex((value) =>
        value.category.includes(modifiedCategoryParam)
      );

      setIndex(indexOfTechnologies);
      applyFilters();
    }
  }, []);

  //Handles the change of the checkboxes and radio buttons
  function changeCheckBoxHandler(e) {
    if (e.target.type === "radio") {
      setFilters((oldValue) => {
        return { ...oldValue, jobCategory: e.target.id };
      });

      return;
    }
    if (e.target.checked) {
      setFilters((oldValue) => {
        let newValue = oldValue[e.target.name];
        if (!newValue.includes(e.target.id)) {
          newValue.push(e.target.id);
        }

        return { ...oldValue, [e.target.name]: newValue };
      });
    } else {
      setFilters((oldValue) => {
        let newValue = oldValue[e.target.name].filter(
          (value) => value !== e.target.id
        );

        return { ...oldValue, [e.target.name]: newValue };
      });
    }
  }

  //Function that filters the array of jobs
  function applyFilters() {
    const allJobs = jobsExamples;
    const filteredArray = allJobs.filter((job) => {
      const matchCategory =
        !filters.jobCategory || job.jobKind.includes(filters.jobCategory);
      const matchLocation =
        !filters.jobLocation.length ||
        filters.jobLocation.includes(job.jobLocation);
      const matchLevel =
        !filters.jobLevel.length || filters.jobLevel.includes(job.jobLevel);
      const matchTechnologies =
        !filters.jobTechnologies.length ||
        equalElementInArrays(filters.jobTechnologies, job.technologiesStack);

      // Only return true if all conditions are met (AND logic)
      return matchCategory && matchLocation && matchLevel && matchTechnologies;
    });

    setJobsArray(filteredArray);
  }

  //Function that resets the filters
  function resetFilters() {
    setFilters({
      jobLocation: [],
      jobLevel: [],
      jobTechnologies: [],
      jobCategory: "",
    });

    setJobsArray(jobsExamples);
  }

  //Function that returns true if every element in arr1 is inside arr2
  function equalElementInArrays(arr1, arr2) {
    return arr1.every((element) => arr2.includes(element));
  }

  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* <!-- Filter Section --> */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold text-[#00b4d8] mb-4">
            Персонализирай търсенето
          </h2>

          {/* <!-- Way to Work Filter --> */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-blue-1000">
              Начин на работа
            </h3>
            <div className="space-y-2 mt-2">
              <div>
                <input
                  type="checkbox"
                  id="remote"
                  className="mr-2"
                  name="jobLocation"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLocation.includes("remote")}
                />
                <label htmlFor="remote">Fully Remote</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="hybrid"
                  className="mr-2"
                  name="jobLocation"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLocation.includes("hybrid")}
                />
                <label htmlFor="hybrid">Hybrid</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="onsite"
                  className="mr-2"
                  name="jobLocation"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLocation.includes("onsite")}
                />
                <label htmlFor="onsite">On-Site</label>
              </div>
            </div>
          </div>

          {/* <!-- Experience Level Filter --> */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-blue-1000">Ниво на опит</h3>
            <div className="space-y-2 mt-2">
              <div>
                <input
                  type="checkbox"
                  id="junior"
                  className="mr-2"
                  name="jobLevel"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLevel.includes("junior")}
                />
                <label htmlFor="junior">Junior</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="mid"
                  className="mr-2"
                  name="jobLevel"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLevel.includes("mid")}
                />
                <label htmlFor="mid">Regular / Mid</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="senior"
                  className="mr-2"
                  name="jobLevel"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLevel.includes("senior")}
                />
                <label htmlFor="senior">Senior</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="lead"
                  className="mr-2"
                  name="jobLevel"
                  onChange={changeCheckBoxHandler}
                  checked={filters.jobLevel.includes("lead")}
                />
                <label htmlFor="lead">Lead / Manager</label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-blue-1000">Технологии</h3>
            {jobTechnologies.map((technology, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={technology.category}
                  className="mr-2"
                  name="jobTechnologies"
                  checked={technology.category.includes(categoryParam)}
                  onChange={(e) => {
                    changeCheckBoxHandler(e);
                    setIndex(index);
                  }}
                />
                <label>{technology.category}</label>
              </div>
            ))}
          </div>

          {filters.jobCategory !== "" && jobCategoryIndex !== -1 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-1000">
                Подтехнологии
              </h3>
              {jobTechnologies[jobCategoryIndex].technologies.map(
                (technology) => (
                  <div key={technology}>
                    <input
                      type="checkbox"
                      id={technology}
                      className="mr-2"
                      name="jobTechnologies"
                      onChange={(e) => {
                        changeCheckBoxHandler(e);
                      }}
                      checked={filters.jobTechnologies.includes(technology)}
                    />
                    <label>{technology}</label>
                  </div>
                )
              )}
            </div>
          )}

          {/* <!-- Filter Button --> */}
          <button
            id="filter-btn"
            className="w-full bg-blue-950 text-white py-2 rounded hover:bg-[#00b4d8] mb-3"
            onClick={applyFilters}
          >
            Приложи филтрите
          </button>
          <button
            id="filter-btn"
            className="w-full bg-blue-950 text-white py-2 rounded hover:bg-[#00b4d8]"
            onClick={resetFilters}
          >
            Изтрий филтрите
          </button>
        </div>

        {/* <!-- Job Listings Section --> */}
        <div className="col-span-3 space-y-6">
          {/* <!-- Job Post Example --> */}
          {/*<div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-blue-600">
                JAVA Mid Developer
              </h3>
              <p className="text-gray-600">
                Technologies:{" "}
                <span className="font-semibold">
                  Java, Spring, MySQL, Docker
                </span>
              </p>
            </div>
            <div className="text-gray-500">26.07.2024</div>
          </div>*/}

          {/* <!-- Additional Job Post --> */}
          {/*<div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-blue-600">
                JAVA Regular Developer
              </h3>
              <p className="text-gray-600">
                Technologies:{" "}
                <span className="font-semibold">
                  Java, Hibernate, Kubernetes
                </span>
              </p>
            </div>
            <div className="text-gray-500">23.07.2024</div>
          </div>*/}

          {/* <!-- Additional Job Post --> */}
          {/*<div className="bg-white p-6 shadow rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-blue-600">
                JAVA Developer
              </h3>
              <p className="text-gray-600">
                Technologies:{" "}
                <span className="font-semibold">Java, Spring Boot, AWS</span>
              </p>
            </div>
            <div className="text-gray-500">30.06.2024</div>
          </div>*/}

          {/*Maps through the array of job objects*/}
          {jobsArray.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-blue-600">
                  {job.jobTitle}
                </h3>
                <p className="text-gray-600">
                  Technologies:{" "}
                  <span className="font-semibold">
                    {job.technologiesStack.join(", ")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
