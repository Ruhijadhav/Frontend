import React,{useState ,useEffect} from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AlumniData from './AlumniData/AlumniData';
import StudentsData from './StudentData/StudentData';

function Teacher(){
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
              alert('Not Authorised');
              nav('/login') 
       }else{

          const decodeToken = jwtDecode(token);
          const { role } = decodeToken;
           if(role != 'Teacher'){
               alert('Not Authorised');
                nav('/login') 
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

    function HandleLogOut() {
        localStorage.clear();
        nav('/login');
    }


     

      
    return(
        <div className='alumni-page'>
             
        <div class="container">
        <div style={{display:'flex', justifyContent : 'center' , alignItems : 'center'}}>
            <header>Teacher Dashboard</header>
            <div style={{width: '75%'}}></div>
           <button onClick={HandleLogOut}>LogOut</button>
        </div>
        <div className='side-bar'> 
               <button onClick={() => setActiveSection('Alumni')}>Alumni</button>
               <button onClick={() => setActiveSection('Students')}>Students</button>
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
                       {activeSection === 'Students' && <StudentsData />}
                       {activeSection === 'shared' &&  <div>Shared</div>}
                </div>

      
        </form>
   </div>

</div>

    )
}

export default Teacher;