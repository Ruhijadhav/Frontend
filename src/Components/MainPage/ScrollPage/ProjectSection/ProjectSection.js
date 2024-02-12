import React, { useState, useEffect } from 'react';
import './ProjectSection.css';
import { useNavigate } from 'react-router-dom';

function ProjectSection() {
  const url = process.env.REACT_APP_BACKEND;
  const [projectData, setProjectData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setInterval(()=>{
        fetchData();
    },2000);
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/bestFive/bestProjectList`); 
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProjectData(data.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log({projectData});

  return (
    <div className='project-container'>
    {projectData.map((project, index) => (
      <div className='project-card' key={index}>
        <h2>{project.Title}</h2>
        <p>Description: {project.Description}</p>
        <p>Sector: {project.Sector}</p>
        <p>GitHub Link: <a href={project.GitHub_link}>{project.GitHub_link}</a></p>
        <p>Demo Link: <a href={project.Demo_link}>{project.Demo_link}</a></p>
        <p>Image: <img src={project.Image} alt={project.Title} /></p>
      </div>
    ))}
    <button onClick={()=>{nav('/ProjectPage')}}>Go To Project Section</button>
  </div>
  );
}

export default ProjectSection;
