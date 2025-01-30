import React ,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav';

function Login() {

    const history = useNavigate();
    const [user,setUser]= useState({
        name:"",gmail:"",
    });
    const handleInputChange = (e)=>{
        const {name,value}=e.target;
        setUser((prevUser)=>({...prevUser,[name]:value}));
    
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await sendRequest();
            if(response.status==="ok"){
                alert("login success");
                history("/userdetails");}
                else{
                    alert  ("LOgin error")}
                }catch(err){alert("error"+err.message)}}
        
                
    

    const sendRequest = async ()=>{
        return await axios.post("http://localhost:5000/login", {
           
            gmail:user.gmail,
            password:user.password
        }).then((res)=>res.data)
    }
  return (
    <div>
        <Nav/>
        <h1>USER LOG-IN</h1>
        <form onSubmit={handleSubmit}>
            
            <label>Gmail</label>
            <br/>
            <input type="email" name="gmail" value={user.gmail} onChange={handleInputChange} required/>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" name="password" value={user.password} onChange={handleInputChange} required/>
            <br/>
            <button type="submit">Log in</button>
            <br/>
            {/* <p>Already have an account? <a href="/login">Login</a></p> */}


        </form>
    </div>
  )
}

export default Login