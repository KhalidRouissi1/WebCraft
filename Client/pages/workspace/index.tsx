import React, { useEffect, useState } from 'react';
import Link from "next/link"
import GuardLayout from '../components/layout';
import axios from 'axios';
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
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); 

  return (


    <GuardLayout>
    <div className="h-[80vh] flex flex-col">
      <div className="flex-1 bg-gray-200 flex items-center justify-center">
      <div
              className="relative w-48 h-64 bg-gray-500 rounded-lg flex items-center justify-center cursor-pointer"
       
              onClick={
                ()=>{
                setPopup(true)
                }
              }
            >
              + New Project
            </div>
      </div>
      <div className="flex justify-center bg-gray-300 py-4">
        <div className="flex space-x-4" key={1}>
            
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
           

        

           {projects.map((project) => (
            <Link key={project.id} href={`workspace/builder/OldProject?id=${project.id}`}>
              <div
                className="relative w-48 h-64 bg-gray-500 rounded-lg flex justify-center items-center"
                onMouseEnter={() =>
                  setHoveredImage(`https://cdn.discordapp.com/attachments/1138848747665768499/1204907862074327132/image.png`)
                }
                onClick={() => {
                  handleClick("");
                }}
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
