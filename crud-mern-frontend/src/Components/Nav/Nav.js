import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul className="home-ul">
        <li className="home-li">
          <Link to="/mainhome">
            <h1>HOME</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/user">
            <h1>+ USER</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/userdetails">
            <h1>USER DETAILS</h1>
          </Link>
          
        </li>
        <li className="home-li">
          <Link to="/conus">
            <h1>CONTACT US</h1>
          </Link>          
        </li>

        <li className="home-li">
          <Link to="/sendpdf">
            <button>SENDPDF</button>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/imgpath">
            <button>Image</button>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/regi">
            <button>Register</button>
          </Link>
          
        </li>
        <li className="home-li">
          <Link to="/log">
            <button>Login</button>
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Nav;
