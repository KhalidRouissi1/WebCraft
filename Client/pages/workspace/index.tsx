import React, { useEffect, useState } from 'react';
import Link from "next/link"
import GuardLayout from '../components/layout';
import axios from 'axios';
import NewProject from "./builder/NewProject"
import OldProject from "./builder/OldProject"




const Index = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const handleClick = (data) => {
    localStorage.clear()
    localStorage.setItem('gjsProject', JSON.stringify(data));
  };

  const [projects, setProjects] = useState([]);
  const [projectCreated, setProjectCreated] = useState(false);
  const [popup, setPopup] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [resData, setResData] = useState({});

  const postData = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/project",
        {
          name: projectName,
          data: ""
        },
        {
          withCredentials: true
        }
      );
      console.log("Project created:", res.data);
      setResData(res.data);
      // Optionally, you can handle success response here
    } catch (error) {
      console.error("Error creating project:", error);
      // Optionally, you can handle error response here
    }
  };

  
  const handlePassResult = async () => {
    await postData();
    setProjectCreated(true)
    console.log("Result data:", resData);
  };


  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(" http://127.0.0.1:8000/api/projects",
        {
            withCredentials:true,
        });
      
        const data = await response.data;
        setProjects(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); 
  console.log(projects)

  return (


    <GuardLayout>
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-gray-200 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-white border border-gray-400 rounded-lg shadow-lg">
          {hoveredImage && (
            <img src={hoveredImage} alt="Hovered image" className="w-full h-full object-contain" />
          )}
          {!hoveredImage && (
            <h1 className="flex justify-center items-center mt-[20%] text-9xl">New Project</h1>
          )}
        </div>
      </div>
      <div className="flex justify-center bg-gray-300 py-4">
        <div className="flex space-x-4">
            
            {
              popup && (
                 <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">Enter The Project name</h2>
                  <input
                        type="text"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className='p-2 m-2'
                    />        
                {
                  !projectCreated && (
                    <button 
                  
                    onClick={handlePassResult}
  
                    >
                      Create 
                    </button>
  
                  )
                }
                {
                  projectCreated &&(
                    <Link 
                    href={`workspace/builder//OldProject?id=${resData.id}`} 
                    className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-700 text-center"
                    >
                      Go to the project {resData.name} 
                    </Link>
                  )
                }



                </div>
              </div>

              )
            }
           

            <div
              className="relative w-48 h-64 bg-gray-500 rounded-lg"
              onMouseEnter={() =>
                setHoveredImage(`https://cdn.discordapp.com/attachments/1138848747665768499/1204907862074327132/image.png`)
              }
              onClick={
                ()=>{
                setPopup(true)
                }
              }
            >
              New Project
            </div>


            {projects.map((project)=>(
                <Link href={`workspace/builder/OldProject?id=${project.id}`} >
                      <div 
                      key={project.id}
                      className="relative w-48 h-64 bg-gray-500 rounded-lg"
                      onMouseEnter={() =>
                        setHoveredImage(`https://cdn.discordapp.com/attachments/1138848747665768499/1204907862074327132/image.png`)
                      }
                      onClick={
                        ()=>{
                        handleClick("")
                        }
                      }
                      >
                      {project.name}
                      </div>
                </Link>
            ))}

        

        </div>
      </div>
    </div>
    </GuardLayout>
  );
};

export default Index;
