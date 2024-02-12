import React,{useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AlumniData from './AlumniData/AlumniData';
import StudentProject from './StudentProject/StudentProject';
import './Dashboard.css';
function Student(){

    const nav = useNavigate();
    const [activeSection, setActiveSection] = useState('Alumni');
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({
        'id' : '',
        'Name': '',
        'Phone': '',
        'Email': '',
        'Image': '',
        'role': ''
    });

    useEffect(() => {
        if(!token){
            alert("Not Authorized");
            nav('/login');
        }else{
            const decodeToken = jwtDecode(token);
            const { role } = decodeToken;
            if(role != 'Student'){
                alert("Not Authorized");
                nav('/login'); 
            }else{
                UserDataLog();
            }
        }
    }, []);

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

   console.log({userData});
    function HandleLogOut() {
        localStorage.clear();
        nav('/login');
    }



   
      
    return(
        <div className='alumni-page'>
             
        <div class="container">
        <div style={{display:'flex', justifyContent : 'center' , alignItems : 'center'}}>
            <header>Student Dashboard</header>
            <div style={{width: '75%'}}></div>
           <button onClick={HandleLogOut}>LogOut</button>
        </div>
        <div className='side-bar'> 
               <button onClick={() => setActiveSection('Alumni')}>Alumni</button>
               <button onClick={() => setActiveSection('project')}>Projects</button>
               <button onClick={() => setActiveSection('shared')}>shared</button>
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
                       {activeSection === 'Alumni' && <AlumniData />}
                       {activeSection === 'project' && <StudentProject userData={userData}/>}
                       {activeSection === 'shared' &&  <div>Shared</div>}
                </div>

        </form>
   </div>

</div>

    )
}

export default Student;