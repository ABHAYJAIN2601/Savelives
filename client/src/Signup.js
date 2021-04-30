import {React,useState} from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
const Signup = (props) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmpass] = useState("");
    const [msg,setError] = useState("");
    const sendRequest =()=>{
        let OPTIONS = {
            url: "/signup",
            method: "POST",
            data: {
              email: email,
              password: password,
              confirmpassword: confirmPassword,
            },
      
            headers: {
              "content-type": "application/json",
            },
          };
      
          axios(OPTIONS)
            .then((res) => {
              const message = res.data.message;
              localStorage.setItem("token", res.data.token);
                if(message==='User Registered Successfully'){
              window.location.href = "/welcome"}
              else{
                  if(res.data.err){
                    if(res.data.err.name==='MongoError'){
                        setError('This email is already used');
                       
                      }else{
                        setError('Please enter valid email'); 
                      }
                  }else{
                    setError(message);
                  }
                  

                  console.log(res.data.err);
                  
              }
            })
            .catch((err) => console.log(err));
        };
        const responseGoogle = (response) => {
            let OPTIONS = {
                url: "/signup",
                method: "POST",
                data: {
                  email: response.profileObj.email,
                  password: response.googleId,
                  confirmpassword: response.googleId,
                },
          
                headers: {
                  "content-type": "application/json",
                },
              };
          
              axios(OPTIONS)
                .then((res) => {
                  const message = res.data.message;
                  console.log(message,res.data.err)
                  localStorage.setItem("token", res.data.token);
                  if(message==='User Registered Successfully')
                  window.location.href = "/welcome"
                })
                .catch((err) => console.log(err));
          } 
    return (
        <div className='signup-div'>
        <h1>
          Sign up
        </h1>
        <p>Email</p>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <p>Password</p>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p>Confirm Password</p>
        <input type="password" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmpass(e.target.value)}/>
        <p className='message'>{msg}</p>
        <button onClick={sendRequest}>Sign up</button>
        <GoogleLogin
    clientId="66984000890-3rv1rk4l1tpi5q96likq9tdmg52eto04.apps.googleusercontent.com"
    buttonText="Signup with google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
        </div>
    )
}


export default Signup;
