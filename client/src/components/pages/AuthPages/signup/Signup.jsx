import React, { useState } from "react";
import "./Signup.css";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ImageAndWlc from "../ImageAndWlc";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
import { toast } from "react-toastify";
import { ToasterMessage } from "../../../../helper/toastHelper";

const Signup = () => {
  const navigate = useNavigate();
  const [sigupData, setSignupData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const baseURL = useBaseApi();
  const { setAccessToken } = useAccessToken();

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSignupData({
      ...sigupData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(sigupData);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/api/v1/user/signup`,
        {
          name: sigupData.name,
          email: sigupData.email,
          password: sigupData.password,
          appType: "ecommerce",
        },
        {
          headers: {
            projectID: "4stjj1sb1x5a",
          },
        }
      );
      // const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
      //   method: 'POST',
      //   headers: {
      //     'projectId': '4stjj1sb1x5a',
      //     'Content-Type': 'application/json'
      //   }, body: JSON.stringify({
      //     "name": sigupData.name,
      //             "email": sigupData.email,
      //             "password": sigupData.password,
      //             "appType": "ecommerce",
      //   })
      // });
      // .then((response) => console.log(response));
      // console.log(response.json());

      if (response.status === 201) {
        const accessToken = response.data.token;
        const userName = response.data.data.user.name;
        // console.log(accessToken);
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("userName", userName);
        setAccessToken(accessToken);

        ToasterMessage('success',"Account created successfully");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      ToasterMessage('error',e.response.data.message)
    }
  };

  return (
    <div className="signup-wrapper">
      <Container fluid>
        <Row>
          <Col md={7}>
            <ImageAndWlc />
          </Col>
          <Col>
            <div className="login-section">
              <Title title="Sign In" />
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="validName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={handleChange}
                    placeholder="Name"
                    name="name"
                  />
                </Form.Group>
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
                <Form.Group controlId="validEmail">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required
                    type="age"
                    onChange={handleChange}
                    placeholder="Age"
                    name="age"
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
                  Sign In
                </Button>
              </Form>
              <div className="options-container">
                <div onClick={() => navigate("/login")}>
                  Already have an account?
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
