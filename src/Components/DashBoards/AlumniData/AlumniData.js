import React,{useState ,useEffect} from "react";
import './AlumniData.css';

function AlumniData(){
    const url = process.env.REACT_APP_BACKEND;
    const [alumni , setAlumni] = useState([]);
    const token = localStorage.getItem('token');
    const [selectedAlumni, setSelectedAlumni] = useState(null);


     useEffect(()=>{
            getAlumni();
     },[]);

     async function getAlumni() {
        try { 
            const response = await fetch(`${url}/user/getAlumni`, {
                headers: {
                    'Authorization': `${token}` 
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setAlumni(data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleAlumniClick = (alumnus) => {
        setSelectedAlumni(alumnus);
    };
    const handleCloseOverlay = () => {
        setSelectedAlumni(null);
    };

    console.log({alumni});


    return (
        <div className="AlumniData">
            <h1>Alumni Data</h1>
            <ul>
                {alumni.map((alumnus, index) => (
                   <li key={index} onClick={() => handleAlumniClick(alumnus)}>
                        <img src={"http://localhost:5000/images" + alumnus.Image} alt="alm" width={200} height={200}/>
                        <p>{alumnus.FirstName + " "}{alumnus.MiddleName + " "}{alumnus.LastName}</p>
                    </li>
                ))}
            </ul>


            {selectedAlumni && (
                <div className="overlay" >
                    <div className="overlay-content">
                         <div>
                                <img src={"http://localhost:5000/images" + selectedAlumni.Image} alt="alm" width={200} height={200}/>
                               <h2>{selectedAlumni.FirstName + " "}{selectedAlumni.MiddleName + " "}{selectedAlumni.LastName}</h2>
                               <p>Email: {selectedAlumni.Email}</p>
                               <p>Phone: {selectedAlumni.Phone}</p>
                               <p>Passing Year: {selectedAlumni.PassingYear}</p>
                               <p>Position: {selectedAlumni.Position}</p>
                               <p>Course: {selectedAlumni.Course}</p>
                               <p>Company: {selectedAlumni.Company}</p>
                               <p>Linkdin: {selectedAlumni.LinkDin}</p>
                               <p>Sector: {selectedAlumni.Sector}</p>
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

export default AlumniData;