import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./OrderSuccess.css";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();

  if (!accessToken) {
    navigate("/login");
    return;
  }
  return (
    <div className="order-success-container">
      <Image
        src="https://bewakoof-clone-react-project-1-ac0ogzjs0uot.vercel.app/static/media/order-success-bag.84b2b0e106ea3cfe71c2.gif"
        className="order-success-img"
        loading="lazy"
        alt="order-successfull"
      />
      <div className="order-succes-text">
        <h3>Thank you for shopping!</h3>
        <p>Your order has been placed</p>
        <Button onClick={() => navigate("/")}>Shop Now</Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
