import React from "react";
import "./Footer.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// import PaymentsIcon from "@mui/icons-material/Payments";

// import appAndroidStore from "./../../assets/images/appAndroidStore.webp";
// import appIosStore from "./../../assets/images/appIosStore.webp";
// import securePaymentsImg from "./../../assets/images/securePaymentsImg.webp";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <h3>Made by - Batata vada</h3>
      <ul>
        <li>Vedant Kulkarni</li>
        <li>Ruchir Shukla</li>
        <li>Pranav Shirole</li>
        <li>Omkar Yadav</li>
      </ul>
    </div>
  );
};

export default Footer;
