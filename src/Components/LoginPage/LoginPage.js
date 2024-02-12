import React,{useState, useEffect} from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
      const nav = useNavigate();
      const url = process.env.REACT_APP_BACKEND;
      const [role, setRole] = useState('');
      const [Email , setEmail] = useState('');
      const [password ,setPassword] = useState('');
      const [formStep, setFormStep] = useState(1);

     function handleRole() {
      const selectedRole = document.querySelector('input[name="roles"]:checked');

      if (selectedRole) {
        setRole(selectedRole.value);
        setFormStep(2);
      } else {
        alert('Please select a role.');
      }
}

    function handleReg(){
        if (role) {
                nav(`/${role}`);
          } else {
            alert('Please select a role.');
          }
    }

    async function handleSubmit() {
      const loginCred = {
          'Email': Email,
          'password': password,
          'role': role,
      };
  
      try {
          const response = await fetch(`${url}/user/login`, {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginCred),
          });
  
          if (!response.ok) {
              console.log(response);
          }
  
          const result = await response.json();
          alert(result.message);
          console.log({ 'message': result.message });

          if(result.token){
            localStorage.setItem('token', result.token);
            setRole('');
            setEmail('');
            setPassword('');
            nav(`/${role}DashBoard`);
          }


      } catch (err) {
          console.error('Error:', err);
      }
  }

  async function handleEmail(){
        console.log("Handle Email is called");
         try{
              const response = await fetch(`${url}/emailVarification`,{
                   method : 'POST',
                   headers : {
                      'Content-Type' : 'application/json'
                   },
                   body : JSON.stringify({ Email: "" })
              });

              if(!response.ok){
                     console.log("response is not okay");
              }
              const result = await response.json();
              console.log(result);
              
         }catch(err){
               console.log(err);
         }
  }

    const [isVarified , setIsVarified] = useState(false);
    
  

      return(

            <div className='alumni-page'>
             
            <div class="container">
            <header>Login</header>

            <div className='form-repl'>
                    <div class="details personal">
                     <div className='blocks'>   
                              {
                                      formStep === 1 ? (
                                 
                                          <div class="input-field">
    
                                          <div className='role-head'>Choose your role</div>
                                          <div name="Sectors" id="Sector" style={{ width: '13rem'}}>
                                            <div className='role-a alum'>
                                                <div className='roles' for="Alumni">Alumni</div>
                                                <input type='radio' name='roles' className='radios' id='Alumni' value='Alumni' />
                                            </div>
                                            <div className='role-a teach'>
                                                <div className='roles' for="Teacher">Teacher</div>
                                                <input type='radio' name='roles' className='radios' id='Teacher' value='Teacher' />
                                            </div> 
                                            <div className='role-a std'>
                                                <div className='roles' for="Student">Student</div>
                                                <input type='radio' name='roles' className='radios' id='Student' value='Student'/>
                                            </div>
                                            <div className='role-a admin'>
                                                <div  className='roles' for="Admin">Admin</div>
                                                <input type='radio' name='roles' className='radios' id='Admin' value='Admin'/>
                                            </div>    

                                              <div className='next'>
                                                        <i className='fa fa-arrow-right next-arrow' onClick={handleRole}></i>
                                                </div> 
                                          </div>
                                      </div> 
                                   
            
                                      ) : (
                                          
                                           <div>
                                           
                                                <div className='role-head'>Enter Your Credentials</div>
                                                    <div class="fields" style={{display: 'flex' , flexDirection: 'column'}}>
                                        

                                                     <label for='e-mail'>Email</label>
                                                      <input type="text" className='cred' id='e-mail' placeholder="Enter your Email" onChange={(e)=> setEmail(e.target.value)}  style={{ width: '13rem'}} required/>

                                                      <label for='pass-word'>Password</label>
                                                      <input type="text" className='cred' id='pass-word' placeholder="Enter your Password" onChange={(e)=> setPassword(e.target.value)}  style={{ width: '13rem'}} required/>

                                                      <button  className='login-btn' onClick={handleSubmit}>Submit</button>   
                                                    
 
                                                       <div>Forgot your password ? <a href='#'>Click here</a></div> 
  
                                                         </div>
                                                       
                                                         <div className='next'>
                                                              <i className='fa fa-arrow-left back-arrow' onClick={()=> setFormStep(1)}></i>
                                                        </div> 
                                            
                                              
                                          </div>
                                         
                                      )
                              }
                     </div>
                     
                </div>
          
            </div>

            <div className='nav-btn'>
                <div className='next'>
                   <i className='fa fa-arrow-left next-arrow' onClick={()=>nav('/')}></i>
                </div>
                <div className='adj'></div>
                {
                      formStep === 2? (
                           <div className='next'>
                           <div style={{ color: 'rgb(0,0,0)' , fontSize : '20px', fontStyle:'bold'}}>Register</div>  <i className='fa fa-arrow-right next-arrow' onClick={handleReg}></i>
                           </div>
                      ):(
                          <div></div>
                      )
                }
           </div>
                                          
       </div>
    
    </div>
    
      )
}

export default LoginPage;