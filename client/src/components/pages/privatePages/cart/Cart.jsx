import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useCartItemsNumber } from "../../../contextApi/CartItemsNumberContext";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
import { ToasterMessage } from "../../../../helper/toastHelper";

import axios from "axios";
import "./Cart.css";
import CartProductCard from "./CartProductCard";
import { fetchingCartItems } from "../../../../helper/CartFetchingHelper";
import { useCartItems } from "../../../contextApi/CartItemsContext";

const Cart = () => {
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   fetchingCartItems();
  // }, []);

  const { accessToken } = useAccessToken();
  const { cartItems, setCartItems, totalPrice, setTotalPrice } = useCartItems();
  const { cartItemsNumber, setCartItemsNumber } = useCartItemsNumber();

  const handleRemoveFromCart = async (id) => {
    // console.log(id);
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
        {
          headers: {
            projectID: "4stjj1sb1x5a",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        ToasterMessage("success", response?.data?.message);
        setTotalPrice(response.data.data.totalPrice);
        setCartItems(response.data.data.items);

        // decreasing cart number in the navbar cart icon
        setCartItemsNumber(response.data.data.items.length);
      }
    } catch (error) {
      ToasterMessage("error", error.response.data.message);
    }
  };
  const handleAddToWishlist = async (id) => {
    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
        {
          productId: id,
        },
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("response", response);
      if (response.status === 200) {
        ToasterMessage("success", response?.data?.message);
      }
    } catch (e) {
      // toast.error(e.response.data.message);
      ToasterMessage("info", e.response.data.message);
    }
  };
  // console.log(totalPrice);

  const handleRemoveAllItemsFromCart = async () => {
    try {
      const response = await axios.delete(
        "https://academics.newtonschool.co/api/v1/ecommerce/cart/",
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setCartItems([]);
        setCartItemsNumber(0);
        ToasterMessage("success", response.data.message);
      }
    } catch (error) {
      ToasterMessage("error", error.message);
    }
  };
  if (accessToken === "") {
    navigate("/login");
    return;
  }

  if (cartItems.length !== 0) {
    return (
      <Container className="cart-wrapper">
        <div className="cart-mybag-removeAll-button-container">
          <p className="my-bag-text">
            <strong>My Bag</strong> {cartItems.length} item(s)
          </p>
          <Button onClick={handleRemoveAllItemsFromCart}>
            <DeleteTwoToneIcon />
            Remove All
          </Button>
        </div>

        <Row>
          <Col>
            <div className="cart-items-wrapper">
              <div className="cart-items-container">
                <div className="cart-free-delivery">
                  <Image
                    src="https://images.bewakoof.com/web/Red-truck.png"
                    fluid
                    width="30px"
                    className="cart-car-img"
                    loading="lazy"
                    alt="shipping-truck"
                  />
                  &nbsp;&nbsp;&nbsp;
                  <span className="cart-free-delivery-text">
                    Yay! You get FREE delivery on this order
                  </span>
                </div>
                {cartItems.map((item) => {
                  return (
                    <div className="cart-item-conatiner" key={item._id}>
                      <CartProductCard item={item} />
                      <div className="cart-item-button-container">
                        <Button
                          className="cart-item-btn"
                          onClick={() => handleRemoveFromCart(item.product._id)}
                        >
                          Remove
                        </Button>
                        <Button
                          className="cart-item-btn"
                          onClick={() => handleAddToWishlist(item.product._id)}
                        >
                          Move to Wishlist
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
          <Col>
            <div className="cart-summary-wrapper">
              <div className="cart-summary-container">
                <h3 className="cart-summary-tribe-offer">
                  Save extra <strong>₹120</strong> with <strong>TriBe</strong>
                </h3>
                <p className="cart-summary-code-offer">
                  Whistles! Get extra Rs.100 Discount on all prepaid orders
                  above Rs.1499. Use Code - EXTRA100.
                </p>
                <div className="cart-summary-coupon-title">
                  <p className="cart-summary-coupon">
                    Apply Coupon / Gift Card / Referral
                  </p>
                </div>
                <div className="price-summary-container">
                  <h3 className="price-summary-title">PRICE SUMMARY</h3>
                  <div className="price-summary">
                    <div className="price-summary-total-container">
                      <p className="price-summary-total-title">
                        Total MRP (Incl. of taxes)
                      </p>
                      <p className="price-summary-total-price">₹{totalPrice}</p>
                    </div>
                    <div className="price-summary-shipping-charge-container">
                      <p className="price-summary-shipping-charge-title">
                        Shipping Charges
                      </p>
                      <p className="price-summary-shipping-charge">FREE</p>
                    </div>
                    <div className="price-summary-subtotal-container">
                      <p className="price-summary-subtotal-title">Subtotal </p>
                      <p className="price-summary-subtotal-price">
                        ₹{totalPrice}
                      </p>
                    </div>
                  </div>
                  <div className="cart-checkout-btn-wrapper">
                    <div className="cart-checkout-btn-container">
                      <div>
                        <p className="total-price">Total</p>
                        <p>₹{totalPrice}</p>
                      </div>
                      <Button
                        className="cart-checkout-btn"
                        onClick={() => navigate("/checkout")}
                      >
                        PROCEED TO CHECKOUT
                      </Button>
                    </div>
                    <div className="trustBaggeContainer ">
                      <div>
                        <Image
                          src="https://images.bewakoof.com/web/cart-badge-trust.svg"
                          loading="lazy"
                          alt="badge-trust"
                        />
                        <p>100% SECURE PAYMENTS</p>
                      </div>
                      <div>
                        <Image
                          src="https://images.bewakoof.com/web/cart-easy-return.svg"
                          loading="lazy"
                          alt="return"
                        />
                        <p>EASY RETURNS & QUICK REFUNDS</p>
                      </div>
                      <div>
                        <Image
                          src="https://images.bewakoof.com/web/quality-check.svg"
                          loading="lazy"
                          alt="quality-check"
                        />
                        <p>QUALITY ASSURANCE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <div className="cart-wrapper">
        <div className="empty-cart-container">
          <Image
            src="https://images.bewakoof.com/images/doodles/empty-cart-page-doodle.png"
            alt="empty-cart"
            fluid
            width="15%"
            loading="lazy"
          />
          <div className="empty-list-title">Nothing in the bag</div>
          <div className="empty-list-subtitle">
            Add your product here and make them yours soon!
          </div>
          <Button type="button" onClick={() => navigate("/")}>
            Shop Now
          </Button>
        </div>
      </div>
    );
  }
};

export default Cart;
