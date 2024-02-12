import React,{useEffect, useState} from 'react';
import './AlumniPage.css';
import Photo from './Photo';
import { useImageContext } from './MyContext';
import { useNavigate } from 'react-router-dom';

function StudentPage(){
       const nav = useNavigate();
       const { imageBlob } = useImageContext();
       const url = process.env.REACT_APP_BACKEND;

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
        "Role" : "Student",
      };

      const [student, setStudent] = useState(initialState);

       useEffect(()=>{
            handleYears();
       })

       function handleYears(){
           const select = document.getElementById("Year");
           for(let i = 22 ; i < 24 ; i++){
                const option = document.createElement("option");
                option.value = 2000+i;
                option.innerHTML = 2000+i;
                select.appendChild(option);
           }
       }

       async function handleSubmit(e) {
        e.preventDefault();
        console.log({ imageBlob });
      
        try {
          const formData = new FormData(); 
    
          for (const key in student) {
            formData.append(key, student[key]);
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
      
          setStudent(initialState);
        } catch (err) {
          console.error({ error: err, message: "Some error occurred" });
          alert("Some error occurred");
        }
      }

       return(
           <div className='alumni-page'>
                   <div class="container">
                <div style={{display:'flex' , justifyContent : 'center'}}>
                <header>Student Registration</header>
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
                                    <input type="text" placeholder="Enter first name" onChange={(e)=> setStudent({...student ,FirstName: e.target.value})} required/>
                                </div>
                                <div class="input-field">
                                    <label>Middle Name</label>
                                    <input type="text" placeholder="Enter middle name" onChange={(e)=> setStudent({...student ,MiddleName: e.target.value})}  />
                                </div>

                        <div class="input-field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter last name" onChange={(e)=> setStudent({...student ,LastName: e.target.value})} required/>
                        </div>

                        <div class="input-field">
                          <label>Email</label>{ /*<i className='fa fa-close' onClick={openOverlay}></i> */}
                       <input type="email" placeholder="Enter your email" onChange={(e)=> setStudent({...student ,Email: e.target.value})} required/>
                        </div>

                        {/*showOverlay && (
        <div id="overlay" className="overlay">
          <div className="modal">
            <span className="close-icon" onClick={closeOverlay}>×</span>
                <input type='number' onChange={(e)=> setUserOTP(e.target.value)} /> <button onClick={handleOTP}>Submit</button> <button>Resend otp</button>
            <p>This is your overlay content.</p>
          </div>
        </div>
                        )*/}
                        

                        <div class="input-field">
                            <label>Mobile Number</label>
                            <input type="text" placeholder="Enter mobile number" onChange={(e)=> setStudent({...student ,Phone: e.target.value})} />
                        </div>

                        <div class="input-field">
                        <div class="form-group">
                            <label for="passingyear">Admission Year:</label>
                            <select name="Year" id="Year" onChange={(e)=> setStudent({...student ,PassingYear: e.target.value})}>
                            </select>
                             
                        </div>
                        </div>
                        <div class="input-field">
                            <label>Course Name</label>
                            <select name="Course" id="Course" onChange={(e)=> setStudent({...student ,Course: e.target.value})}>
                            <option value="M.SC(Mathematics)">M.Sc Mathematics</option>
                            <option value="M.SC(IMCA)">M.SC industrial Mathematics With Computer Application</option>
                            <option value="Ph.D">Ph.D</option>
                            </select>
                        </div>
                        <div class="input-field">
                            <label>PRN Number</label>
                            <input type="number" placeholder="Enter your PRN Number" onChange={(e)=> setStudent({...student ,id: e.target.value})} />
                        </div>

                      
                        <div class="input-field">
                            <label>Linked IN Profile</label>
                            <input type="text" placeholder="Enter your Linked IN profile" onChange={(e)=> setStudent({...student ,Linkdin: e.target.value})} required/>
                        </div>
    
                        <div class="input-field">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" onChange={(e)=> setStudent({...student ,Password: e.target.value})} required/>
                        </div>
                        
                        <button type="submit">Submit</button>
                    
                        <div class="input-field">
                            <label for="confirmpassword">Confirm Password:</label>
                            <input type="password" id="confirmpassword" name="confirmpassword" onChange={(e)=> setStudent({...student ,ConfirmPassword: e.target.value})} required/>
                        </div>
                    </div>
                    </div>
                </div>
              
                </form>
           </div>
        
        
        </div>
        
    
       )
}
export default StudentPage;