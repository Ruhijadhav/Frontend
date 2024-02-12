import React, { useState, useEffect } from "react";
import './ProjectPage.css';

function ProjectPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const url = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/project/getApprovedProject`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const openOverlay = async (studentId) => {
    try {
      const response = await fetch(`${url}/user/getStudent/${studentId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const jsonData = await response.json();
      setSelectedStudent(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
    setSelectedStudentId(studentId);
  };
  
  const closeOverlay = () => {
    setSelectedStudentId(null);
  };

  return (
    <div className="project-container">
        {data.map((project) => (
          <div key={project.id} className="project">
             <img className="project-image" src={`${url}/images${project.Image}`} width={300} height={300} />
             <div className="project-content">
                 <p className="project-title">{project.Title}</p>
                <p className="project-description">{project.Description}</p>
              </div>
              <button onClick={()=>openOverlay(project.Student_id)}>Created By</button>
              {selectedStudentId === project.Student_id && (
            <div className="overlay" >
                  
              <div className="overlay-content">
                  <div> 
                      <img src={`${url}/images${selectedStudent[0].Image}`} alt="Student" width={200} height={200} />
                      <div>{selectedStudent[0].FirstName} {selectedStudent[0].MiddleName} {selectedStudent[0].LastName}</div>
                      <div> Course -  {selectedStudent[0].Course} </div>
                      <div> Linkdin -  {selectedStudent[0].Linkdin} </div>
                 </div>
                 <button onClick={closeOverlay}> Close</button>
              </div>
            </div>
          )}
          </div>
        ))}
    </div>
  );
}

export default ProjectPage;
