import React, { useState } from 'react'
import Nav from "../Nav/Nav";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Plus.css";

function Plususer() {
const history = useNavigate();
const[inputs,setInputs] = useState({
    name:"",
    gmail:"",
    age:"",
    address:" ",
});

const handleChange =(e)=>{
    setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value,
    }))};

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history('/userdetails'))};
         
const sendRequest = async()=>{
    await axios.post("http://localhost:5000/users", {
        name:inputs.name,
        gmail:inputs.gmail,
        age:inputs.age,
        address:inputs.address
}).then(res=>res.data); 
}


  return (
    <div>  
        <Nav/>
        
        <h1>ADD new users</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br></br>
            <input type="text" name="name" onChange={handleChange} value={inputs.name} required ></input>
            <br></br>
            <br></br>
            <label>Gmail</label>
            <br></br>
            <input type="text" name="gmail" onChange={handleChange} value={inputs.gmail} required ></input>
            <br></br>
            <br></br>
            <label>Age</label>
            <br></br>
            <input type="text" name="age" onChange={handleChange} value={inputs.age} required ></input>
            <br></br>
            <br></br>
            <label>Address</label>
            <br></br>
            <input type="text" name="address" onChange={handleChange} value={inputs.address} required ></input>
            <br></br>
            <br></br>
            <button className='lk'>Submit</button>
        </form>
        </div>
  )
}

export default Plususer