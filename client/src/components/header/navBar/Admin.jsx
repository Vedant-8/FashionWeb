import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import { Link } from "react-router-dom";
import { useAccessToken } from "../../contextApi/AccessTokenContext";
import { ToasterMessage } from "../../../helper/toastHelper";
const Admin = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [user, setUser]= useState(true);
  const {setAccessToken} = useAccessToken();

  const userName = localStorage.getItem("userName");

  const handleLogOut = ()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    setAccessToken('');
    ToasterMessage('success','logout successfull');

    // window.location.reload();
  }

  return (
    <div>
     

      <Dropdown className="admin-dropdown">
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="admin-dropdown"
        >
          <PersonOutlineTwoToneIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu className="admin-dropdown-menu">
          <Dropdown.Item className="user-name">Hi, {userName}</Dropdown.Item>
          <Dropdown.Item>
            <Link to="/account">My Account</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="/wishlist">My Wishlist</Link>
          </Dropdown.Item>
          <Dropdown.Item><Link to="/account/orders">My Orders</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/" onClick={handleLogOut}>Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Admin;
