import { useState } from "react";
import { Link } from "react-router-dom";

const JobCategories = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  return (
    <section className="container mx-auto my-12">
      <h1 className="text-4xl font-bold text-center mb-8">Категории и Обяви</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {/* Backend Development */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#3CBDDC] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("backend")}
          >
            Backend Development
          </div>
          {openDropdown === "backend" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Backend/Java"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-java"></i> Java
              </Link>
              <Link
                to="/jobs/Backend/PHP"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-php"></i> PHP
              </Link>
              <Link
                to="/jobs/Backend/Python"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-python"></i> Python
              </Link>
              <Link
                to="/jobs/Backend/Node.js"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-node-js"></i> Node.js
              </Link>
              <Link
                to="/jobs/Backend/MySQL"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-database"></i> MySQL
              </Link>
              <Link
                to="/jobs/Backend/.NET"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-microsoft"></i> .NET
              </Link>
            </div>
          )}
        </div>

        {/* Frontend Development */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#A55DD8] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("frontend")}
          >
            Frontend Development
          </div>
          {openDropdown === "frontend" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Frontend/JavaScript"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-js-square"></i> JavaScript
              </Link>
              <Link
                to="/jobs/Frontend/React"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-react"></i> React
              </Link>
              <Link
                to="/jobs/Frontend/Vue.js"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-vuejs"></i> Vue.js
              </Link>
              <Link
                to="/jobs/Frontend/Angular"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-angular"></i> Angular
              </Link>
              <Link
                to="/jobs/Frontend/HTML&CSS"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-html5"></i> HTML & CSS
              </Link>
              <Link
                to="/jobs/Frontend/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Full Stack Development */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#6600CC] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("fullstack")}
          >
            Full Stack Development
          </div>
          {openDropdown === "fullstack" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Fullstack/Java&Angular"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-java"></i> Java & Angular
              </Link>
              <Link
                to="/jobs/Fullstack/Java&React"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-react"></i> Java & React
              </Link>
              <Link
                to="/jobs/Fullstack/React&Node.js"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-node-js"></i> React & Node.js
              </Link>
              <Link
                to="/jobs/Fullstack/Angular&Node.js"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-angular"></i> Angular & Node.js
              </Link>
              <Link
                to="/jobs/Fullstack/Vue.js&Node.js"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-vuejs"></i> Vue.js & Node.js
              </Link>
              <Link
                to="/jobs/Fullstack/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Infrastructure */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#008B45] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("infrastructure")}
          >
            Infrastructure
          </div>
          {openDropdown === "infrastructure" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Infrastructure/DevOps"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-server"></i> DevOps
              </Link>
              <Link
                to="/jobs/Infrastructure/Database Engineer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-database"></i> Database Engineer
              </Link>
              <Link
                to="/jobs/Infrastructure/Cybersecurity"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-shield-alt"></i> Cybersecurity
              </Link>
              <Link
                to="/jobs/Infrastructure/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Development */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#F9A825] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("mobile")}
          >
            Mobile Development
          </div>
          {openDropdown === "mobile" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Mobile/Android"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-android"></i> Android
              </Link>
              <Link
                to="/jobs/Mobile/iOS"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-apple"></i> iOS
              </Link>
              <Link
                to="/jobs/Mobile/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Quality Assurance */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#9400D3] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("qa")}
          >
            Quality Assurance
          </div>
          {openDropdown === "qa" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/QA/Automation QA"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-robot"></i> Automation QA
              </Link>
              <Link
                to="/jobs/QA/Manual QA"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-check"></i> Manual QA
              </Link>
              <Link
                to="/jobs/QA/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Project Management / Business Analysis */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#F45D22] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("pm-ba")}
          >
            PM/BA and more
          </div>
          {openDropdown === "pm-ba" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/pm-ba/IT Business Analyst"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-business-time"></i> IT Business Analyst
              </Link>
              <Link
                to="/jobs/pm-ba/IT Project Management"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-project-diagram"></i> IT Project Management
              </Link>
              <Link
                to="/jobs/pm-ba/Product Management"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-clipboard"></i> Product Management
              </Link>
              <Link
                to="/jobs/pm-ba/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* ERP / CRM Development */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#003F5E] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("erp-crm")}
          >
            ERP / CRM Development
          </div>
          {openDropdown === "erp-crm" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Sales/Sales Force"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-salesforce"></i> Sales Force
              </Link>
              <Link
                to="/jobs/Sales/SAP"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-sap"></i> SAP
              </Link>
              <Link
                to="/jobs/Sales/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Data Science */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#3CB371] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("data-science")}
          >
            Data Science
          </div>
          {openDropdown === "data-science" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/DataScience/ETL Data Warehouse"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-database"></i> ETL/Data Warehouse
              </Link>
              <Link
                to="/jobs/DataScience/Big Data"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-project-diagram"></i> Big Data
              </Link>
              <Link
                to="/jobs/DataScience/ML AI Data Modeling"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-brain"></i> ML/AI/Data Modeling
              </Link>
              <Link
                to="/jobs/DataScience/BI Data Visualization"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-chart-line"></i> BI/Data Visualization
              </Link>
              <Link
                to="/jobs/DataScience/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* UI/UX, Arts */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#FF6347] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("ui-ux-arts")}
          >
            UI/UX, Arts
          </div>
          {openDropdown === "ui-ux-arts" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/UI UX Arts/UI UX Designer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-pencil-ruler"></i> UI/UX Designer
              </Link>
              <Link
                to="/jobs/UI UX Arts/Motion Designer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-paint-brush"></i> Motion Designer
              </Link>
              <Link
                to="/jobs/UI UX Arts/Game Designer"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-gamepad"></i> Game Designer
              </Link>
              <Link
                to="/jobs/UI UX Arts/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* IT Management */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#2E8B57] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("it-management")}
          >
            IT Management
          </div>
          {openDropdown === "it-management" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/IT Management/Director"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-user-tie"></i> Director
              </Link>
              <Link
                to="/jobs/IT Management/Engineering Manager"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-briefcase"></i> Engineering Manager
              </Link>
              <Link
                to="/jobs/IT Management/Architect"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-building"></i> Architect
              </Link>
              <Link
                to="/jobs/IT Management/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>

        {/* Marketing & Sales */}
        <div className="w-full sm:w-60">
          <div
            className="bg-[#B22222] text-white px-8 py-4 rounded text-center cursor-pointer"
            onClick={() => toggleDropdown("marketing-sales")}
          >
            Marketing & Sales
          </div>
          {openDropdown === "marketing-sales" && (
            <div className="bg-white shadow-lg rounded-lg p-4 mt-2 w-full">
              <Link
                to="/jobs/Marketing & Sales/Market Research & Analysis"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-chart-line"></i> Market Research & Analysis
              </Link>
              <Link
                to="/jobs/Marketing & Sales/SEO & SEM"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-search"></i> SEO & SEM
              </Link>
              <Link
                to="/jobs/Marketing & Sales/Google Ads & Analytics"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-google"></i> Google Ads & Analytics
              </Link>
              <Link
                to="/jobs/Marketing & Sales/Social Media Marketing"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fab fa-facebook"></i> Social Media Marketing
              </Link>
              <Link
                to="/jobs/Marketing & Sales/Sales Expert"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-handshake"></i> Sales Expert
              </Link>
              <Link
                to="/jobs/Marketing & Sales/Sales Agent"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-phone"></i> Sales Agent
              </Link>
              <Link
                to="/jobs/Marketing & Sales/Sales & Business"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                <i className="fas fa-business-time"></i> Sales & Business
                Development
              </Link>
              <Link
                to="/jobs/Marketing & Sales/null"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Other
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;