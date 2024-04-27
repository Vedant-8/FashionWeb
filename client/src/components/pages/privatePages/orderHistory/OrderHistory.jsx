import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "./OrderHistory.css";
import axios from "axios";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const {accessToken} = useAccessToken();


  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/order",
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization:
            `Bearer ${accessToken}`
          },
        }
      );
      console.log(response.data.data);
      if (response.status === 200) {
        setOrders(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const reverseOrders = [...orders].reverse();
  if(!accessToken)
  {
    navigate("/login");
    return;
  }
  return (
    <div className="orders-wrapper">
      <div className="orders-container">
        <Button className="order-back-to-acc-btn" onClick={()=>navigate('/account')}>
          <ArrowBackIosIcon />
          Back to My Account
        </Button>
        <h3 className="orders-title">My Orders</h3>
        <hr />
        {orders.length !== 0 ? (
          <div>
            {reverseOrders?.map((item) => {
              return (
                <div key={item?.order?._id} className="order-item-wrapper">
                  <h3 className="order-no">
                    ORDER NO. <span>#{item?.order?._id}</span>
                  </h3>
                  <div className="order-item-container" onClick={()=>navigate(`/account/orders/${item.order._id}`)}>
                    <Image
                      src={item.order.items[0].product?.displayImage}
                      className="order-item-image"
                      onClick={() =>
                        navigate(`/product/${item.order.items[0].product._id}`)
                      }
                      loading="lazy"
                      alt={item?.order.items[0].product?.name}
                    />

                    <div className="order-item-details-container">
                      <h3 className="order-item-name">
                        {item.order.items[0].product?.name}
                      </h3>
                      <h3 className="order-item-size">Size: S</h3>
                      <p className="order-item-status">ORDER CONFIRMED</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-orders-container">
            <h3 className="empty-orders-title">
              Sadly, you haven't placed any orders till now.
            </h3>
            <Image
              src="https://images.bewakoof.com/sizeguide/no-orders.png"
              alt="no-orders"
              fluid
              className="empty-orders-image"
              loading="lazy"
            />
            <Button onClick={() => navigate("/")} className="empty-orders-btn">
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
