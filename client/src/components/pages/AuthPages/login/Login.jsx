import React, { useState } from "react";
import "./Login.css";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import ImageAndWlc from "../ImageAndWlc";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import "react-toastify/dist/ReactToastify.css";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
import { ToasterMessage } from "../../../../helper/toastHelper";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const baseURL = useBaseApi();
  const { setAccessToken } = useAccessToken();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/api/v1/user/login`,

        {
          email: loginData.email,
          password: loginData.password,
          appType: "ecommerce",
        },
        {
          headers: {
            projectID: "4stjj1sb1x5a",
          },
        }
      );
      // .then((response) => console.log(response));
      // console.log(response);

      if (response.status === 200) {
        const accessToken = response.data.token;
        // console.log(accessToken);
        const userName = response.data.data.name;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("userName", userName);

        setAccessToken(accessToken);

        ToasterMessage("success", "Login successful");

        navigate("/");
      }
    } catch (e) {
      ToasterMessage("error", e.response.data.message);
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(loginData);
  return (
    <div className="login-container">
      <Container fluid>
        <Row>
          <Col md={7}>
            <ImageAndWlc />
          </Col>
          <Col>
            <div className="login-section">
              <Title title="Log In" />
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="validEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={handleChange}
                    placeholder="Email"
                    name="email"
                  />
                </Form.Group>

                <Form.Group controlId="validPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                  />
                </Form.Group>

                <Button type="submit" className="login-btn">
                  Log In
                </Button>
              </Form>
              <div className="options-container">
                <div onClick={() => navigate("/signup")}>
                  Dont have an account?
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
