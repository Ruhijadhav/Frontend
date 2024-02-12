import React,{useEffect, useState} from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ShareWithDept from './ShareWithDept/ShareWithDept';
import ManageStories from './ShareWithDept/ManageStories';

function Alumni(){

    const nav = useNavigate();
    const [activeSection, setActiveSection] = useState('share');
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({
        'id' : '',
        'Name': '',
        'Phone': '',
        'Email': '',
        'Image': '',
        'role': ''
    });

    useEffect(()=>{
           if(!token){
                alert('not authorized');
                nav('/login');
           }else{
            const decodeToken = jwtDecode(token);
            const { role } = decodeToken;
            if(role != 'Alumni'){
                alert('not authorized');
                nav('/login');
            }else{
                UserDataLog();
            }
           }
    },[]);

    function UserDataLog() {
      

        if (token) {
            const decodeToken = jwtDecode(token);
            console.log({decodeToken});
            const { id , email  , Name, Phone, role ,Image } = decodeToken;
            console.log({decodeToken});
            setUserData({
                'id' : id ,
                'Name' : Name,
                'Phone': Phone,
                'Email': email,
                'Image' : Image ,
                'role': role
            });
        }
    }

    
    function HandleLogOut(){
         localStorage.clear();
         nav('/login');
    }

    return(
        <div className='alumni-page'>
             
        <div class="container">
       <div style={{display:'flex', justifyContent : 'center' , alignItems : 'center'}}>
            <header>Alumni Dashboard</header>
            <div style={{width: '75%'}}></div>
           <button onClick={HandleLogOut}>LogOut</button>
        </div>

        <div className='side-bar'> 
               <button onClick={() => setActiveSection('share')}>Share with Department</button>
               <button onClick={() => setActiveSection('manage')}>Manage your Stories</button>
       </div>

        <form action="" method="POST" enctype="multipart/form-data">

        <div class="details personal">
                          <div className='card'>
                                  <div className='details-card'>
                                       <div className='details-text'>
                                           <div>{userData.Name}</div>
                                           <div>{userData.Email}</div>
                                       </div>

                                       <div className='dash-img'>
                                       <img src={"http://localhost:5000/images"+userData.Image} alt='your pic' width='100%' height='100%' />
                                       </div>
                                  </div>
                          </div>
                </div>

                <div> 
                       {activeSection === 'share' && <ShareWithDept userData={userData}/>}
                       {activeSection === 'manage' && <ManageStories userData={userData}/>}
                </div>
      
        </form>
   </div>

</div>

    )
}

export default Alumni;