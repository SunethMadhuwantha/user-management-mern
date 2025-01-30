import React ,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav';

function Register() {

    const history = useNavigate();
    const [user,setUser]= useState({
        name:"",gmail:"",password:"",
    });
    const handleInputChange = (e)=>{
        const {name,value}=e.target;
        setUser((prevUser)=>({...prevUser,[name]:value}));
    
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        sendRequest().then(()=>{
            alert("Register successfully!");
            history("/userdetails");
        }).catch((err)=>{
            alert(err.message)
;});        
    }

    const sendRequest = async ()=>{
        await axios.post("http://localhost:5000/register", {
            name:user.name,
            gmail:user.gmail,
            password:user.password
        }).then((res)=>res.data)
    }
  return (
    <div>
        <Nav/>
        <h1>USER REGISTRATION</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br/>
            <input type="text" name="name" value={user.name} onChange={handleInputChange} required/>
            <br/>
            <label>Gmail</label>
            <br/>
            <input type="email" name="gmail" value={user.gmail} onChange={handleInputChange} required/>
            <br/>
            <label>Password</label>
            <br/>
            <input type="password" name="password" value={user.password} onChange={handleInputChange} required/>
            <br/>
            <button type="submit">Register</button>
            <br/>
            {/* <p>Already have an account? <a href="/login">Login</a></p> */}


        </form>
    </div>
  )
}

export default Register