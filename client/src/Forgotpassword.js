import {React,useState} from 'react'
import axios from 'axios';
function Forgotpassword(props) {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmpass] = useState("");
    const [message,setMessage] = useState("");
    const Changeit=()=>{
        let OPTIONS = {
            url: "/changeit",
            method: "POST",
            data: {
              userid: props.match.params.userid,
              password:password,
              confirmPassword:confirmPassword
            },
        
            headers: {
              "content-type": "application/json",
            },
          };
        
          axios(OPTIONS)
            .then((res) => {
              const message = res.data.message;
                setMessage(message);
            })
            .catch((err) => console.log(err));
    }
    return (
        <div>
        <p>New Password</p>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <p>Confirm Password</p>
        <input type="password" name="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmpass(e.target.value)}/>
        <button onClick={Changeit}>Change password</button>
        <p>{message}</p>
        </div>
    )
}

export default Forgotpassword;
