import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartProductCard = ({ item }) => {
  // console.log(item);
  const navigate = useNavigate();
  const savedPrice = 3456 - item.product.price;
  const id = item.product._id;
  const handleImageClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <Container>
      <Row className="cart-item-row">
        <Col className="cart-item-details">
          <div className="cart-item-name" onClick={handleImageClick}>
            {item?.product?.name}
          </div>
          <div className="cart-item-price-container">
            <span className="cart-item-discount-price">
              ₹{item?.product?.price}
            </span>
            <span className="cart-item-actual-price">₹3456</span>
          </div>
          <p className="cart-item-saved-text">You saved ₹{savedPrice}!</p>
        </Col>
        <Col>
          <Image
            src={item?.product?.displayImage}
            width={100}
            className="cart-item-image"
            onClick={handleImageClick}
            loading="lazy"
            alt={item?.product?.name}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CartProductCard;
