import React,{useEffect, useState} from 'react';
import Photo from './Photo';
import { useNavigate } from 'react-router-dom';
import { useImageContext } from './MyContext';
import './AlumniPage.css';

function AlumniPage(){
    const nav = useNavigate();
    const { imageBlob } = useImageContext();
    const url = process.env.REACT_APP_BACKEND ;
    
    const initialState = {
      "id": null,
      "FirstName": "",
      "MiddleName": "",
      "LastName": "",
      "Address": "",
      "Semester" : "",
      "Email": "",
      "Phone": "",
      "PassingYear": "",
      "Position": "",
      "Course": "",
      "Company": "",
      "Linkdin": "",
      "Sector": "",
      "Password": "",
      "ConfirmPassword": "",
      "Role" : "Alumni",
    };
    
    const [alumni, setAlumni] = useState(initialState);
    
    
    useEffect(() => {
      handleYears();
    }, []);

    function handleYears() {
      const select = document.getElementById("Year");
      for (let i = 0; i < 33; i++) {
        const option = document.createElement("option");
        option.value = 1990 + i;
        option.innerHTML = 1990 + i;
        select.appendChild(option);
      }
    }
    
    async function handleSubmit(e) {
      e.preventDefault();
      console.log("Form submitted", alumni);
     
    
        try {
          const formData = new FormData(); 
    
          for (const key in alumni) {
            formData.append(key, alumni[key]);
          }
    
          formData.append('image', imageBlob);
      
          const response = await fetch(`${url}/user/postUser`, {
            method: 'POST',
            body: formData,
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            alert(result.error);
          } else {
            alert("Thank you for your submission. Please Login now");
            nav('/login');
          }
      
          setAlumni(initialState);
          clearForm();
      
        } catch (err) {
           alert({ error: err, message: "Some error occurred" });
        }
  
    }
    
    function clearForm() {
      document.getElementById("myForm").reset();
  }

  const [showOverlay, setShowOverlay] = useState(false);
  const [genOTP , setGenOTP] = useState(null);
  const [userOTP , setUserOTP] = useState(null);
  const [verified ,setVerified] = useState(false);

  const openOverlay = async() => {

    try{
         const response = await fetch("http://localhost:5000/varification/emailVarification",{
              method : 'POST',
              headers : {
                 'Content-Type' : 'application/json'
              },
              body : JSON.stringify({ 'Email' :alumni.Email })
         });

         if(!response.ok){
                console.log("response is not okay");
         }
         const result = await response.json();
         setGenOTP(result.generatedOTP);
    }catch(err){
          console.log(err);
    }

    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  const handleOTP = async() =>{
        try{

          const response = await fetch("http://localhost:5000/varification/otpMatch",{
            method : 'POST',
            headers : {
               'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ 'userOTP' : userOTP , 'generatedOTP' : genOTP })
       });

       if(!response.ok){
              alert("response is not okay");
       }
       await response.json();
       setVerified(true);
       setShowOverlay(false);
   
        }catch(err){
             console.log(err);
        }
  }



       return(
           <div className='alumni-page'>
             
                <div class="container">
                <div style={{display:'flex' , justifyContent : 'center'}}>
                <header>Alumni Registration</header>
                <div style={{width : '30%'}}></div>
                </div>

                <form onSubmit={handleSubmit} >

                        <div class="details personal">
                            <div className='extra'>
                          <i className='fa fa-arrow-left' onClick={()=> nav('/login')}></i>
                            <span class="title">Login Here</span>
                            </div>

                            <div className='blocks'>       
                             <Photo/>      
                            <div class="fields">
                                <div class="input-field">
                                    <label>First Name</label>
                                    <input type="text" placeholder="Enter first name" onChange={(e)=> setAlumni({...alumni ,FirstName: e.target.value})} required/>
                                </div>
                                <div class="input-field">
                                    <label>Middle Name</label>
                                    <input type="text" placeholder="Enter middle name" onChange={(e)=> setAlumni({...alumni ,MiddleName: e.target.value})}  />
                                </div>

                        <div class="input-field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter last name" onChange={(e)=> setAlumni({...alumni ,LastName: e.target.value})} required/>
                        </div>

                        <div class="input-field">
                          <label>Email</label>
                       <input type="email" placeholder="Enter your email" onChange={(e)=> setAlumni({...alumni ,Email: e.target.value})} required/>
                     {/*     <p className='verify' onClick={openOverlay} style={{backgroundColor : verified ? 'blue' : 'red'}}></p> */}
                        </div>

                        {showOverlay && (
        <div id="overlay" className="overlay">
          <div className="modal">
            <span className="close-icon" onClick={closeOverlay}>×</span>
                <input type='number' onChange={(e)=> setUserOTP(e.target.value)} /> <button onClick={handleOTP}>Submit</button> <button>Resend otp</button>
          </div>
        </div>
                        )}
                        

                        <div class="input-field">
                            <label>Mobile Number</label>
                            <input type="text" placeholder="Enter mobile number" onChange={(e)=> setAlumni({...alumni ,Phone: e.target.value})} />
                        </div>

                        <div class="input-field">
                        <div class="form-group">
                            <label for="passingyear">Passing Year:</label>
                            <select name="Year" id="Year" onChange={(e)=> setAlumni({...alumni ,PassingYear: e.target.value})}>
                            </select>
                             
                        </div>
                        </div>
                        <div class="input-field">
                            <label>Course Name</label>
                            <select name="Course" id="Course" onChange={(e)=> setAlumni({...alumni ,Course: e.target.value})}>
                            <option value="M.SC(Mathematics)">M.Sc Mathematics</option>
                            <option value="M.SC(IMCA)">M.SC industrial Mathematics With Computer Application</option>
                            <option value="Ph.D">Ph.D</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>PRN Number</label>
                            <input type="number" placeholder="Enter your PRN Number" onChange={(e)=> setAlumni({...alumni ,id: e.target.value})} />
                        </div>

                        <div class="input-field">
                            <label>current Company</label>
                            <input type="text" placeholder="Enter your company name" onChange={(e)=> setAlumni({...alumni ,Company: e.target.value})} required/>
                        </div>

                        <div class="input-field">
                            <label>current Position</label>
                            <input type="text" placeholder="Enter your Current Position" onChange={(e)=> setAlumni({...alumni ,Position: e.target.value})} required/>
                        </div>
                      
                        <div class="input-field">
                            <label>Linked IN Profile</label>
                            <input type="text" placeholder="Enter your Linked IN profile" onChange={(e)=> setAlumni({...alumni ,Linkdin: e.target.value})} required/>
                        </div>
                        <div class="input-field">
                            <label>Scetor Of Work</label>
                            <select name="Sectors" id="Sector" onChange={(e)=> setAlumni({...alumni ,Sector: e.target.value})}>
                                <option value="IT">IT</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Teaching">Teaching</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" onChange={(e)=> setAlumni({...alumni ,Password: e.target.value})} required/>
                        </div>
                        
                        <button type="submit">Submit</button>
                    
                        <div class="input-field">
                            <label for="confirmpassword">Confirm Password:</label>
                            <input type="password" id="confirmpassword" name="confirmpassword" onChange={(e)=> setAlumni({...alumni ,ConfirmPassword: e.target.value})} required/>
                        </div>
                    </div>
                    </div>
                </div>
              
                </form>
           </div>
        
        </div>
       )
}
export default AlumniPage;