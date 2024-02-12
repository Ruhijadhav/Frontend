import React,{useEffect , useState} from 'react';
import './AlumniPage.css';
import Photo from './Photo';
import { useImageContext } from './MyContext';
import { useNavigate } from 'react-router-dom';

function TeacherPage(){

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
        "PassingYear": 0,
        "Position": "",
        "Course": "",
        "Company": "",
        "Linkdin": "",
        "Sector": "",
        "Password": "",
        "ConfirmPassword": "",
        "Role" : "Teacher",
      };

      const [teacher, setTeacher] = useState(initialState);


      

       async function handleSubmit(e) {
        e.preventDefault();
        console.log({ imageBlob });
      
        try {
          const formData = new FormData(); 
    
          for (const key in teacher) {
            formData.append(key, teacher[key]);
          }
    
          formData.append('image', imageBlob);
      
          const response = await fetch(`${url}/user/postUser`, {
            method: 'POST',
            body: formData,
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            alert("Response is not okay");
          } else {
            alert("Thank you for your submission. Please Login now");
            nav('/login');
            setTeacher(initialState);
          }
      
          setTeacher(initialState);
        } catch (err) {
          console.error({ error: err, message: "Some error occurred" });
        }
      }




       return(
           <div className='alumni-page'>
             
                <div class="container">
                <div style={{display:'flex' , justifyContent : 'center'}}>
                <header>Teacher Registration</header>
                <div style={{width : '30%'}}></div>
                </div>

                <form onSubmit={handleSubmit}>
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
                                    <input type="text" placeholder="Enter first name" onChange={(e)=> setTeacher({...teacher ,FirstName: e.target.value})} required/>
                                </div>
                                <div class="input-field">
                                    <label>Middle Name</label>
                                    <input type="text" placeholder="Enter middle name" onChange={(e)=> setTeacher({...teacher ,MiddleName: e.target.value})}  />
                                </div>

                        <div class="input-field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter last name" onChange={(e)=> setTeacher({...teacher ,LastName: e.target.value})} required/>
                        </div>

                        <div class="input-field">
                          <label>Email</label>{ /*<i className='fa fa-close' onClick={openOverlay}></i> */}
                       <input type="email" placeholder="Enter your email" onChange={(e)=> setTeacher({...teacher ,Email: e.target.value})} required/>
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
                            <input type="text" placeholder="Enter mobile number" onChange={(e)=> setTeacher({...teacher ,Phone: e.target.value})} />
                        </div>

                  
                        <div class="input-field">
                            <label>Unique Id</label>
                            <input type="number" placeholder="Enter your PRN Number" onChange={(e)=> setTeacher({...teacher ,id: e.target.value})} />
                        </div>

                      
                        <div class="input-field">
                            <label>Linked IN Profile</label>
                            <input type="text" placeholder="Enter your Linked IN profile" onChange={(e)=> setTeacher({...teacher ,Linkdin: e.target.value})} required/>
                        </div>
    
                        <div class="input-field">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" onChange={(e)=> setTeacher({...teacher ,Password: e.target.value})} required/>
                        </div>
                        
                    
                        <div class="input-field">
                            <label for="confirmpassword">Confirm Password:</label>
                            <input type="password" id="confirmpassword" name="confirmpassword" onChange={(e)=> setTeacher({...teacher ,ConfirmPassword: e.target.value})} required/>
                        </div>

                        <button type="submit">Submit</button>
                    </div>
                    </div>
                </div>
                 
                </form>
           </div>
        
        </div>
        
    
       )
}
export default TeacherPage;