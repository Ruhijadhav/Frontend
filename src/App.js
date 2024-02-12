import './App.css';
import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import AlumniPage from './Components/Registration/AlumniPage';
import StudentPage from './Components/Registration/Student';
import TeacherPage from './Components/Registration/Teacher';
import MainPage from './Components/MainPage/MainPage';
import LoginPage from './Components/LoginPage/LoginPage';
import Student from './Components/DashBoards/Student';
import Alumni from './Components/DashBoards/Alumni';
import Teacher from './Components/DashBoards/Teacher';
import Admin from './Components/DashBoards/Admin';
import ProjectPage from './Components/ProjectPage/ProjectPage';


function App() {
  return (

    <div className="App">
          <div id='upr-bor'></div>
          <BrowserRouter>
                <Routes>
                       <Route path='/' element={<MainPage/>}/>
                       <Route path='/login' element={<LoginPage/>}/>
                       <Route path='/Alumni' element={<AlumniPage/>}/>
                       <Route path='/Student' element={<StudentPage/>}/>
                       <Route path='/Teacher' element={<TeacherPage/>}/>
                       <Route path='/StudentDashBoard' element={<Student/>}/>
                       <Route path='/AlumniDashBoard' element={<Alumni/>}/>
                       <Route path='/TeacherDashBoard' element={<Teacher/>}/>
                       <Route path='/AdminDashBoard' element={<Admin/>}/>  
                       <Route path='/ProjectPage' element={<ProjectPage/>}/>            
                </Routes>
         </BrowserRouter>
    </div>
  );
}
export default App;
