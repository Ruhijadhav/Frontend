import React, { useState, useEffect } from "react";
import './Projects.css';

function Projects() {
    const url = process.env.REACT_APP_BACKEND;
    const [projects, setProjects] = useState([]);
    const [originalProjects, setOriginalProjects] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProjects();
    }, []); 

    async function fetchProjects() {
        try {
            const response = await fetch(`${url}/project/getProject`,{
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            setProjects(data.data);
            setOriginalProjects(data.data); 
        } catch (error) {
            console.error(error);
        }
    }

    const handleApprove = async (e, id, approved) => {
        e.preventDefault();
        const newApprovalStatus = approved === 1 ? 0 : 1; 
        try {
            const response = await fetch(`${url}/project/approveProject/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ approved: newApprovalStatus })
            });
            if (!response.ok) {
                throw new Error('Failed to approve project');
            }
            alert(`Project ${newApprovalStatus === 1 ? 'approved' : 'unapproved'}`);
            fetchProjects(); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/project/deleteProject/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            alert('Project deleted successfully');
            fetchProjects(); 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (searchTitle.trim() === '') {
            setProjects(originalProjects); 
        } else {
            const filtered = originalProjects.filter(project =>
                project.Title.toLowerCase().includes(searchTitle.toLowerCase()) 
            );
            setProjects(filtered);
        }
    }, [searchTitle, originalProjects]);
    
    return (
        <div className="project-data">
            <h2>Projects</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Demo-Link</th>
                        <th>Github-Link</th>
                        <th>File</th>
                        <th>Sector</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.Project_id}>
                            <td><img src={"" + project.Image} width={150} height={150} alt="Project" /></td>
                            <td>{project.Title}</td>
                            <td>{project.Description}</td>
                            <td>{project.Demo_link}</td>
                            <td>{project.GitHub_link}</td>
                            <td>{project.File_path}</td>
                            <td>{project.Sector}</td>
                            <td>
                                <div>
                                    <button onClick={(e) => handleApprove(e, project.Project_id, project.Apporved)}>
                                        {project.Apporved === 1 ? 'Unapprove' : 'Approve'}
                                    </button>
                                    <button onClick={(e)=>{handleDelete(e , project.Project_id)}}>
                                           Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Projects;
