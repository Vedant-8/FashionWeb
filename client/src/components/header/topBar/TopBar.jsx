import React from "react";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import "./TopBar.css";
const TopBar = () => {
  return (
    <div className="topBar-wrapper">
      <div className="topBar-container">
        <div>
          <ul className="topBar-items">
            <li>Offers</li>
            <li>Fanbook</li>
            <li> Download App</li>
            <li>TriBe Membership</li>
          </ul>
        </div>
        <div>
          <ul className="topBar-items">
            <li>Contact Us</li>
            <li>Track Order</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
