import React, { useState, useEffect } from "react";
import './UserData.css';
import User from "./User";

function UserData() {
    const url = process.env.REACT_APP_BACKEND;
    const [users, setUsers] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [sector ,setSector] = useState('');
    const [semester ,setSemester]= useState('');
    const [role ,setRole] = useState('');
    const [year ,setYear] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');

    const [showOverlay, setShowOverlay] = useState(false); 
    const [selectedUserId, setSelectedUserId] = useState(null); 

    useEffect(() => {
        fetchUsers();
        handleYears();
    }, []); 

    function handleYears() {
        const select = document.getElementById("Years");
        for (let i = 0; i < 33; i++) {
          const option = document.createElement("option");
          option.value = 1990 + i;
          option.innerHTML = 1990 + i;
          select.appendChild(option);
        }
      }
      

    async function fetchUsers() {
        try { 
            const response = await fetch(`${url}/user/getUsers`, {
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.error(error);
        }
    }

  


    async function fetchUserWithCourse(event){
        const course = event.target.value;
        setSelectedCourse(course);
        try {
            const response = await fetch(`${url}/filter/courseFilter/${course}`,{
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data);
           console.log({course});
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
    }
    async function fetchUserWithSector(event){
        const sector = event.target.value;
        setSector(sector);
        try {
            const response = await fetch(`${url}/filter/secFilter/${sector}`,{
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data);
           console.log({sector});
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
    }
    async function fetchUserWithYear(event){
        const year = event.target.value;
        setYear(year);
        try {
            const response = await fetch(`${url}/filter/yearFilter/${year}`,{
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data);
           console.log({year});
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
    }
    async function fetchUserWithRole(event){
        const role = event.target.value;
        setRole(role);
        try {
            const response = await fetch(`${url}/filter/roleFilter/${role}`,{
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data);
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
    }



    function openOverlay(userId) {

        setSelectedUserId(userId);
        setShowOverlay(true);
    }

    function closeOverlay() {
        setSelectedUserId(null);
        setShowOverlay(false);
    }
    console.log({users});

    const filteredUsers = users.filter(user => {
        const fullName = `${user.FirstName} ${user.MiddleName} ${user.LastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });
    useEffect(() => {
        setUsers(filteredUsers);
    }, [searchTerm]);


    return (
        <div>
             <div>

                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             <select name="Role" id="Role" value={role} onChange={(e)=> fetchUserWithRole(e)}>
                                <option value="">Role</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Alumni">Alumni</option>
                                <option value="Student">Student</option>
                </select>
              
               <select id="courses" value={selectedCourse} onChange={(e)=>fetchUserWithCourse(e)}>
                     <option value="">Course</option>
                     <option value="M.Sc(Mathematics)">M.Sc(Mathematics)</option>
                     <option value="M.SC(IMCA)">M.SC(IMCA)</option>
               </select>
               <select name="Sectors" id="Sector" value={sector} onChange={(e)=> fetchUserWithSector(e)}>
                                <option value="">Sector</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Teaching">Teaching</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Others">Others</option>
                </select>
                <select name="Year" id="Years" value={year} onChange={(e)=> fetchUserWithYear(e)}>
                <option value="">Year</option>
                 </select>
             </div>  
         <div className="user-data">
                <table>
                    <thead>
                        <tr>
                           
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Image</th>
                            <th>Sector</th>
                            <th>Course</th>
                            <th>Passing Year</th>
                            <th>LinkedIn</th>
                            <th>Role</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                               
                                <td>{user.FirstName}</td>
                                <td>{user.MiddleName}</td>
                                <td>{user.LastName}</td>
                                <td>{user.Email}</td>
                                <td>{user.Phone}</td>
                                <td>{user.Address}</td>
                                <td>{user.Company}</td>
                                <td>{user.Position}</td>
                                <td><img width={150} height={150} src={"http://localhost:5000/images"+user.Image} alt="img" /></td>
                                <td>{user.Sector}</td>
                                <td>{user.Course}</td>
                                <td>{user.PassingYear}</td>
                                <td>{user.Linkdin}</td>
                                <td>{user.Role}</td>
                                <td><div>
                                        <button onClick={(e) => {openOverlay(user.id) ; e.preventDefault()} }>Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                    <User id={selectedUserId} closeOverlay={closeOverlay}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserData;
