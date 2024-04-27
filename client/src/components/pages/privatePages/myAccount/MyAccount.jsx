import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useAccessToken } from "../../../contextApi/AccessTokenContext";

import "./MyAccount.css";

const MyAccount = () => {
  const navigate = useNavigate();

  const { accessToken } = useAccessToken();

  if (!accessToken) {
    navigate("/login");
    return;
  }

  return (
    <div className="account-wrapper">
      <div className="account-container">
        <h3 className="account-title">MyAccount</h3>
        <div className="account-links-container">
          <div
            className="account-links"
            onClick={() => navigate("/account/orders")}
          >
            <h4>
              My Orders <ArrowForwardIosIcon className="arrow-icon" />
            </h4>
            <p>Verify, modify and track orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
