import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Navbar from "../components/gloabal/NavBar";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [projectCreated, setProjectCreated] = useState(false);
  const [popup, setPopup] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [resData, setResData] = useState({});
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameError, setNameError] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const postData = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/project",
        {
          name: projectName,
          data: "",
        },
        {
          withCredentials: true,
        }
      );
      setResData(res.data);
      setPopup(false); // Close the popup after creating project
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handlePassResult = async () => {
    if (projectName.trim() === "") {
      setNameError(true);
    } else if (
      projects.some((project) => project.name === projectName.trim())
    ) {
      setDuplicateError(true);
    } else {
      setNameError(false);
      setDuplicateError(false);
      await postData();
      setProjectCreated(true);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/projects", {
          withCredentials: true,
        });

        const data = await response.data;
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [projectCreated]);

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/project/${deleteProjectId}`,
        {
          withCredentials: true,
        }
      );

      setProjects(projects.filter((project) => project.id !== deleteProjectId));
      setDeleteProjectId(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex flex-col gap-3"
        style={{ backgroundColor: "#1a202c" }}
      >
        <div className="flex-1 bg-gray-700 flex items-center justify-center md:mt-32">
          {" "}
          <div
            className="relative w-24 h-32 md:w-48 md:h-64 bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              setPopup(true);
            }}
            style={{ backgroundColor: "#bfa888", color: "white" }}
          >
            + New Project
          </div>
        </div>
        <div className="flex justify-center bg-gray-800 py-4">
          {" "}
          <div className="max-w-lg w-full mx-auto overflow-y-auto max-h-96">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-600 rounded-lg focus:outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((project) =>
                  project.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((project) => (
                  <div key={project.id} className="relative">
                    <div
                      className="w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (!deleteProjectId) {
                          window.location.href = `workspace/builder/OldProject?id=${project.id}`;
                        }
                      }}
                      style={{ backgroundColor: "#bfa888", color: "white" }}
                    >
                      {project.name}
                    </div>
                    <div className="absolute bottom-2 right-2 cursor-pointer">
                      <FaTrash
                        size={20}
                        color="red"
                        onClick={() => setDeleteProjectId(project.id)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {popup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-md flex flex-col">
              {" "}
              <h2 className="text-2xl font-bold mb-4 text-white">
                {" "}
                Enter your project name
              </h2>
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="p-2 m-2"
              />
              {nameError && (
                <span className="text-red-500 text-sm">
                  Please enter a project name
                </span>
              )}
              {duplicateError && (
                <span className="text-red-500 text-sm">
                  Project name already exists
                </span>
              )}
              {!projectCreated && (
                <button
                  onClick={handlePassResult}
                  className="bg-[#025c70d8] text-white px-4 py-2 rounded-md hover:bg-[#025b70]"
                >
                  Create
                </button>
              )}
              {projectCreated && (
                <Link
                  href={`workspace/builder/OldProject?id=${resData.id}`}
                  className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-700"
                >
                  Go to the project {resData.name}
                </Link>
              )}
            </div>
          </div>
        )}
        {deleteProjectId && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-md flex flex-col">
              {" "}
              <h2 className="text-2xl font-bold mb-4 text-white">
                {" "}
                // Dark mode text color Confirm Delete Project
              </h2>
              <p className="text-white">
                {" "}
                // Dark mode text color Do you want to delete the project "
                {
                  projects.find((project) => project.id === deleteProjectId)
                    ?.name
                }
                "?
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={handleDeleteProject}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteProjectId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
