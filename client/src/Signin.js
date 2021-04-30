import React,{useState} from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
const Signin = (props) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errromsg,setError] = useState("");
  const sendRequest=()=>{
  let OPTIONS = {
    url: "/login",
    method: "POST",
    data: {
      email: email,
      password: password,
    },

    headers: {
      "content-type": "application/json",
    },
  };

  axios(OPTIONS)
    .then((res) => {
      const message = res.data.message;
      console.log(message,res.data.err)
      setError(message);
      localStorage.setItem("token", res.data.token);
    if(message==='User Found')
      window.location.href = "/welcome"
    })
    .catch((err) => console.log(err));
 };
 const responseGoogle = (response) => {
    let OPTIONS = {
        url: "/login",
        method: "POST",
        data: {
          email: response.profileObj.email,
          password: response.googleId,
        },
    
        headers: {
          "content-type": "application/json",
        },
      };
    
      axios(OPTIONS)
        .then((res) => {
          const message = res.data.message;
          console.log(message,res.data.err)
          setError(message);
          localStorage.setItem("token", res.data.token);
        if(message==='User Found')
          window.location.href = "/welcome"
        })
        .catch((err) => console.log(err));
         
  }
 const sendMail=()=>{
     if(email===''){
    setError('type your email')    
    }else{
        let OPTIONS = {
            url: "/forgot",
            method: "POST",
            data: {
              email: email
            },
        
            headers: {
              "content-type": "application/json",
            },
          };
        
          axios(OPTIONS)
            .then((res) => {
              const message = res.data.message;
              setError(message);

            })
            .catch((err) => console.log(err));
    }
   
 };
    return (
        <div className='signin-div'>
        <h1>
        Sign in
      </h1>
      <p>Email</p>
      <input type="text" placeholder='Type your email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <p>Password</p>
      <input type="password" placeholder='Password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <p className='message'>{errromsg}</p>

      <button onClick={sendRequest}>Sign in</button>
      <a href='/signup'>Sign up</a>
      <button onClick={sendMail}>Forgot password</button>
      <GoogleLogin
    clientId="66984000890-3rv1rk4l1tpi5q96likq9tdmg52eto04.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
    )
}


export default Signin;
