import React,{useState ,useEffect} from "react";
import './StudentData.css';

function StudentsData(){
    const url = process.env.REACT_APP_BACKEND;
    const [students , setStudents] = useState([]);
    const token = localStorage.getItem('token');
    const [selectedStudent, setSelectedStudents] = useState(null);


     useEffect(()=>{
            getStudents();
     },[]);

     async function getStudents() {
        try { 
            const response = await fetch(`${url}/user/getStudents`, {
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setStudents(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleStudentsClick = (alumnus) => {
        setSelectedStudents(alumnus);
    };
    const handleCloseOverlay = () => {
        setSelectedStudents(null);
    };

  
    return (
        <div className="StudentsData">
            <h1>Students Data</h1>
            <ul>
                {students.map((student, index) => (
                   <li key={index} onClick={() => handleStudentsClick(student)}>
                        <img src={"http://localhost:5000/images" + student.Image} alt="alm" width={200} height={200}/>
                        <p>{student.FirstName + " "}{student.MiddleName + " "}{student.LastName}</p>
                    </li>
                ))}
            </ul>


            {selectedStudent && (
                <div className="overlay" >
                    <div className="overlay-content">
                         <div>
                                <img src={"http://localhost:5000/images" + selectedStudent.Image} alt="alm" width={200} height={200}/>
                               <h2>{selectedStudent.FirstName + " "}{selectedStudent.MiddleName + " "}{selectedStudent.LastName}</h2>
                               <p>Email: {selectedStudent.Email}</p>
                               <p>Phone: {selectedStudent.Phone}</p>
                               <p>Passing Year: {selectedStudent.PassingYear}</p>
                               <p>Course: {selectedStudent.Course}</p>
                               <p>Linkdin: {selectedStudent.Linkdin}</p>
                        </div>

                        <div>
                                 
                        </div>

                    </div>
                    <button onClick={handleCloseOverlay}>Close</button>
                </div>
            )}
        </div>
      );
}

export default StudentsData;