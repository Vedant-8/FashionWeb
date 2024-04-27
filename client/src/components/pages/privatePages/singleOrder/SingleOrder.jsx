import { Button, Col, Container, Image, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "./SingleOrder.css";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";

const SingleOrder = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    items: [],
    orderDate: "",
    shipmentDetails: {
      address: {
        city: "",
        street: "",
        country: "",
        state: "",
        zipCode: "",
      },
      type: "",
    },
    status: "",
    totalPrice: 0,
    _id: "",
  });
  useEffect(() => {
    fetchSingleOrderDetails();
  }, []);

  const userName = localStorage.getItem("userName");
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const {accessToken} = useAccessToken();


  const fetchSingleOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/order/${id}`,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization:
            `Bearer ${accessToken}`
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setOrderDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // converting ordered date to string
  const date = new Date(orderDetails?.orderDate);
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();
  const orderedTime = localDate + " " + localTime;

  console.log("orderDetails", orderDetails);

  if(!accessToken)
  {
    navigate("/login");
    return;
  }

  return (
    <div className="singleorder-wrapper">
      <div className="singleorder-container">
        <Button
          className="back-to-orders-btn"
          onClick={() => navigate("/account/orders")}
        >
          <ArrowBackIosIcon />
          Back to My Orders
        </Button>

        <h3 className="single-order-no">
          ORDER <span>#{orderDetails?._id}</span>
        </h3>
        <Container>
          <Row>
            <Col>
              <div className="single-order-details-container">
                <Image
                  src={orderDetails?.items[0]?.product.displayImage}
                  className="single-order-img"
                  onClick={()=>navigate(`/product/${orderDetails?.items[0]?.product._id}`)}
                  loading="lazy"
                  alt={orderDetails?.items[0]?.product.name}
                />
                <div className="single-order-details">
                  <h3 className="single-order-name">
                    {orderDetails?.items[0]?.product.name}
                  </h3>
                  <p className="single-order-size">Size : S</p>
                  <p className="single-order-price">
                    {" "}
                    ₹{orderDetails?.items[0]?.product.price}
                  </p>
                  <p className="single-order-placed-time">
                    ORDER PLACED ON <span>{orderedTime}</span>
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="shipping-details-container">
                <h3 className="shipping-details-title">SHIPPING DETAILS</h3>
                <div className="shipping-details-user-name">
                <p >{userName}</p>
                <label className="shipping-details-address-type">
                  {orderDetails?.shipmentDetails?.type}
                </label>
                </div>
                <div className="shipping-details-address-container">
                  <span>{orderDetails?.shipmentDetails?.address?.street},</span>
                  <span>{orderDetails?.shipmentDetails?.address?.city},</span>
                  <span>{orderDetails?.shipmentDetails?.address?.zipCode},</span>
                  <span>{orderDetails?.shipmentDetails?.address?.state},</span>
                  <span>{orderDetails?.shipmentDetails?.address?.country}</span>
                </div>
              </div>
              <div className="payment-summary-container">
                <h3 className="payment-summary-title">PAYMENT SUMMARY</h3>
                <div className="payment-summary-price-wrapper">
                  <span>Cart Total</span>
                  <span className="payment-summary-amount">
                    ₹ {orderDetails?.items[0]?.product?.price}
                  </span>
                </div>
                <div className="payment-summary-price-wrapper">
                  <span>Delivery Fee</span>
                  {orderDetails?.items[0]?.product?.price < 1000 ? (
                    <span className="payment-summary-amount">₹ 30</span>
                  ) : (
                    <span className="payment-summary-amount">₹ 0</span>
                  )}
                </div>
                <div className="payment-summary-price-wrapper">
                  <span>Order Total</span>
                  <span className="payment-summary-amount">
                    ₹
                    {orderDetails?.items[0]?.product?.price < 1000
                      ? orderDetails?.items[0]?.product?.price + 30
                      : orderDetails?.items[0]?.product?.price}
                  </span>
                </div>
                <div className="payment-summary-price-wrapper totalrow">
                  <span>Amount To Be Paid</span>
                  <span className="payment-summary-amount">
                    ₹
                    {orderDetails?.items[0]?.product?.price < 1000
                      ? orderDetails?.items[0]?.product?.price + 30
                      : orderDetails?.items[0]?.product?.price}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SingleOrder;
