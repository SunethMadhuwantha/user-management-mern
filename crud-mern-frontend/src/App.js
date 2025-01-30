import "./App.css";
import process from 'process';

import Home from "./Components/Home/Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';



import UserDetails from "./Components/UserDetails/UserDetails";

import Plususer from "./Components/Add/Plususer";
import UpdateUser from "./Components/Update/UpdateUser";
import TestDownload from "./Components/TestDownload";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ContactUs from "./Components/ContactUs/ContactUs";
import SendPdf from "./Components/SendPdf/SendPdf";
import ImgUploader from "./Components/ImgUploader/ImgUploader";



function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/mainhome" element={<Home />} />
          <Route  path="/user" element={<Plususer/>} />
          <Route  path="/userdetails" element={<UserDetails />} />
          <Route  path="/userdetails/:id" element={<UpdateUser />} />
          <Route  path="/conus" element={<ContactUs />} />
          <Route path="/regi" element={<Register />} />
          <Route path="/log" element={<Login />} />
          {/* New Route for TestDownload */}
          <Route path="/testdownload" element={<TestDownload />} />
          <Route path="/sendpdf" element={<SendPdf />} />
          <Route path="/imgpath" element={<ImgUploader />} />
        </Routes>
        
      <></>
    

      </React.Fragment>
      
       
    </div>
  );
}

export default App;
