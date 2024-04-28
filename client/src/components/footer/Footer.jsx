import React from "react";
import "./Footer.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PaymentsIcon from "@mui/icons-material/Payments";

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
    <div className="footer-wrapper">
      <Container className="footer-container">
        <section>
          <Row className="row">
            <Col sm={4} md={3} className="menu-section">
              <span className="footer-title">BATATA VADA</span>
              <ul>
                {/* <li>
                  <Link to="/">Contact us</Link>
                </li> */}
                <li>
                  <Link to="/account/orders">Vedant Kulkarni</Link>
                </li>
                <li>
                  <Link to="/account/orders">Ruchir Shukla</Link>
                </li>
                <li>
                  <Link to="/account/orders">Pranav Shirole</Link>
                </li>
                <li>
                  <Link to="/account/orders">Ruchir Shukla</Link>
                </li>
              </ul>
            </Col>
            {/* <Col sm={4} md={3} className="menu-section">
              <span className="footer-title">COMPANY</span>
              <ul>
                <li>
                  <Link to="/">About us</Link>
                </li>
                <li>
                  <Link to="/">We are Hiring</Link>
                </li>
                <li>
                  <Link to="/">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
              </ul>
            </Col>
            <Col sm={4} md={3} className="menu-section">
              <span className="footer-title">CONNECT WITH US</span>
              <ul>
                <li>
                  <Link to="https://www.facebook.com/bewakoofcom">
                    <FacebookIcon />
                    <span>4.7M People Like this</span>
                  </Link>
                </li>
                <li>
                  <Link to="https://www.instagram.com/bewakoofofficial/">
                    <InstagramIcon />
                    <span>10.7M People Like this</span>
                  </Link>
                </li>
                <li>
                  <Link to="https://twitter.com/bewakoof">
                    <TwitterIcon />
                    <span>5.7M People Like this</span>
                  </Link>
                </li>
                <li>
                  <Link to="https://www.pinterest.com/bewakoof/">
                    <PinterestIcon />
                    <span>2.7M People Like this</span>
                  </Link>
                </li>
              </ul>
            </Col> */}
            {/* <Col sm={4} md={3} className="menu-section">
              <span className="footer-title">CONNECT WITH US</span>
              <ul>
                <li>
                  <form>
                    <input type="text" placeholder="Enter Email Id" />
                    <input
                      type="submit"
                      value="SUBSCRIBE"
                      className="subs-btn"
                    />
                  </form>
                </li>
              </ul>
            </Col> */}
            {/* </Row> */}
            {/* </section>
        <section className="payment-gateway">
          <Row>
            <Col sm={4} md={3}>
              <ul>
                <li>
                  <Link to="">
                    <KeyboardReturnIcon />
                    <span>15 Days return policy*</span>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <PaymentsIcon />
                    <span> Cash on delivery*</span>
                  </Link>
                </li>
              </ul>
            </Col> */}
            {/* <Col sm={4} md={3} className="menu-section">
              <span className="footer-title">DOWNLOAD THE APP</span>
              <div className="download-app">
                <Link to="https://play.google.com/store/apps/details?id=com.beyoungapp&hl=en&gl=US&pli=1">
                  <Image src={appAndroidStore}  alt="appAndroidStore"fluid  loading="lazy"/>
                </Link>
                <Link to="https://www.apple.com/app-store/">
                  <Image src={appIosStore} fluid alt="appIosStore" loading="lazy"/>
                </Link>
              </div>
            </Col> */}
            {/* <Col sm={4} md={3} className="menu-section">
              <span className="footer-title">100% SECURE PAYMENT</span>
              <Image src={securePaymentsImg}fluid  alt="securePaymentsImg" loading="lazy"/>

             
            </Col> */}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Footer;
