import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import UserData from './UserData/UserData';
import UserFilter from './UserData/UserFilter';
import Projects from './Projects/Projects';
import Screen from './Screen/Screen';
import Contact from './Contact/Contact';

function Admin() {
    const nav = useNavigate();
    const [userData, setUserData] = useState({
        'id' : '',
        'Name': '',
        'Phone': '',
        'Email': '',
        'role': ''
    });

    const [activeSection, setActiveSection] = useState('users');
    const token = localStorage.getItem('token');

    useEffect(() => {

    

        if (!token ) {
            alert("Not Authorized");
            nav('/login');
        } else {
             const decodeToken = jwtDecode(token);
            const {  role } = decodeToken;
            if(role != 'Admin'){
                alert("Not Authorized");
                nav('/login');
            }else{
                UserDataLog(token);
            }
           
        }
    }, []);

    function UserDataLog() {

        if (token) {
            const decodeToken = jwtDecode(token);
            const { id , email  , Name, Phone, role } = decodeToken;
            console.log({decodeToken});
            setUserData({
                'id' : id ,
                'Name' : Name,
                'Phone': Phone,
                'Email': email,
                'role': role
            });
        }
    }

    function HandleLogOut() {
        localStorage.clear();
        nav('/login');
    }

    return (
        <div className='alumni-page'>
             
        <div class="container">
       <div style={{display:'flex', justifyContent : 'center' , alignItems : 'center'}}>
            <header>Admin Dashboard</header>
            <div style={{width: '75%'}}></div>
           <button onClick={HandleLogOut}>LogOut</button>
        </div>
        <div className='side-bar'> 
               <button onClick={() => setActiveSection('users')}>Users</button>
               <button onClick={() => setActiveSection('projects')}>Projects</button>
               <button onClick={() => setActiveSection('screen')}>Screen</button>
               <button onClick={() => setActiveSection('contact')}>Contact</button>
       </div>
        <form action="" method="POST" enctype="multipart/form-data">

                <div class="details personal">
                          <div className='card'>
                                  <div className='details-card'>
                                    {
                                       <div className='details-text'>
                                           <div>{userData.Name}</div>
                                           <div>{userData.Email}</div>
                                       </div>
                                  }
                                       <div className='dash-img'>
                                               <img src={userData.image} alt='your pic' width='100%' height='100%' />
                                       </div>
                                  </div>
                          </div>
                </div>


                <div> 
                       {activeSection === 'users' && <UserData/>}
                       {activeSection === 'projects' && <Projects />}
                       {activeSection === 'screen' && <Screen/>}
                       {activeSection === 'contact' && <Contact />}
                </div>

        </form>
   </div>

</div>

    );
}

export default Admin;
