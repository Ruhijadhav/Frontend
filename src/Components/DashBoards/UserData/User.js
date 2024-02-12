import React, { useState, useEffect } from "react";
import "./User.css"; 

function User({ id , closeOverlay}) {
    const url = process.env.REACT_APP_BACKEND;
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        getUserWithId(id);
    }, [id]); 

    async function getUserWithId(id) {
        try {
            const response = await fetch(`${url}/user/getUser/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            const data = await response.json();
            setUser(data.data); 
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/user/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(updatedUser)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            const data = await response.json();
            console.log(data.data);
            alert(data.message);
            closeOverlay();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/user/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            const data = await response.json();
            console.log({data});
            alert(data.message);
            closeOverlay();
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleChange = (e, key) => {
        setUpdatedUser(prevState => ({
            ...prevState,
            [key]: e.target.value
        }));
    };
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-container">
            <div className="user-details">
                <h2>User Details  {user[0].Role}</h2>
                <div className="blocks">
                <div className="input-field">
                <input value={updatedUser.FirstName || user[0].FirstName} onChange={(e) => handleChange(e, 'FirstName')} />
                </div>
                <div className="input-field">
                <input value={updatedUser.MiddleName || user[0].MiddleName} onChange={(e) => handleChange(e, 'MiddleName')} />
                </div>
                <div className="input-field">
                <input value={updatedUser.LastName || user[0].LastName} onChange={(e) => handleChange(e, 'LastName')} />
                </div>
                </div>
                <div className="blocks">
                <div className="input-field">
                     <input value={updatedUser.Semester || user[0].Semester} onChange={(e) => handleChange(e, 'Semester')} />
                </div>
                <div className="input-field">
                     <input value={updatedUser.Email|| user[0].Email} onChange={(e) => handleChange(e, 'Email')} />
                </div>
                <div className="input-field">
                       <input value={updatedUser.Phone || user[0].Phone} onChange={(e) => handleChange(e, 'Phone')} />
                </div>
                </div>

                <div className="blocks">
                <div className="input-field">
                   <input value={updatedUser.PassingYear || user[0].PassingYear} onChange={(e) => handleChange(e, 'PassingYear')} />
                </div>
                <div className="input-field">
                    <input value={updatedUser.Position || user[0].Position} onChange={(e) => handleChange(e, 'Position')} />
                </div>
                <div className="input-field">
                    <input value={updatedUser.Course ||user[0].Course} onChange={(e) => handleChange(e, 'Course')} />
                </div>
                </div>

                <div className="blocks">
                <div className="input-field">
                    <input value={updatedUser.Company ||user[0].Company} onChange={(e) => handleChange(e, 'Company')} />
                </div>
                <div className="input-field">
                    <input value={updatedUser.Company ||user[0].Linkdin} onChange={(e) => handleChange(e, 'Linkdin')} />
                </div>
                <div className="input-field">
                    <input value={updatedUser.Sector ||user[0].Sector} onChange={(e) => handleChange(e, 'Sector')} />
                </div>
                </div>

               <div className="edit-btns">
                   <button onClick={(e)=>handleDelete(e)}>Delete</button>
                    <button onClick={(e)=>handleUpdate(e)}>Update</button>
                    <button onClick={closeOverlay}>Close</button>
               </div>
            </div>
        </div>
    );

  
}

export default User;
