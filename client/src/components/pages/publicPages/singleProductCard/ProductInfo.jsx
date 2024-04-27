import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Accordion from "react-bootstrap/Accordion";
import "./SingleProductCard.css";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";

import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartItemsNumber } from "../../../contextApi/CartItemsNumberContext";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
import { ToasterMessage } from "../../../../helper/toastHelper";
import { useCartItems } from "../../../contextApi/CartItemsContext";
import { Typography } from "@mui/material";

import ImageCarousel from "./ImageCarousel";

const ProductInfo = ({ productDetails }) => {
  // console.log(productDetails);

  const baseURL = useBaseApi();
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [size, setSize] = useState("");
  // const {fetchingWishlistProducts} = wishlistProductsContext();

  const [wishlistItems, setWishlistItems] = useState(null);
  // const [cartItems, setCartItems] = useState(null);
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const { accessToken } = useAccessToken();

  const { cartItemsNumber, setCartItemsNumber } = useCartItemsNumber();
  const { cartItems, setCartItems } = useCartItems();

  useEffect(() => {
    if (accessToken) {
      fetchingWishlistProducts();
    }
  }, [wishlisted]);

  // useEffect(() => {
  //   fetchingCartProducts();
  // }, [addedToCart]);

  const images = [
    {
      original: productDetails?.displayImage,
      thumbnail: productDetails?.displayImage,
    },
  ];

  productDetails?.images?.forEach((img) => {
    images.push({
      original: img,
      thumbnail: img,
    });
  });

  const colorShades = [
    { color: "#0E0E0E", colorName: "Jet Black" },
    { color: "#141C30", colorName: "navy blazer" },
    { color: "maroon", colorName: "bold red" },
    { color: "#1567D9", colorName: "blue" },
    { color: "yellow", colorName: "yellow" },
    { color: "orange", colorName: "orange" },
    { color: "gray", colorName: "gray" },
  ];

  const fetchingWishlistProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/ecommerce/wishlist`, {
        headers: {
          projectId: "4stjj1sb1x5a",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log(response.data.data.items);
      setWishlistItems(response.data.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(wishlistItems);
  // fetchingWishlistProducts();
  const handleAddItemToCart = async () => {
    // if(!accessToken)
    // {
    //   navigate('/login');
    // }

    try {
      if (size === "") {
        ToasterMessage("info", "Please select a size");
        return;
      }
      if (!accessToken) {
        navigate("/login");
      } else {
        const response = await axios.patch(
          `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productDetails._id}`,
          {
            quantity: 1,
            size: `${size}`,
          },
          {
            headers: {
              projectId: "4stjj1sb1x5a",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // console.log("response", response);
        if (response.status === 200) {
          setAddedToCart(true);

          ToasterMessage("success", response.data.message);
          setCartItems(response.data.data.items);
          setCartItemsNumber(response.data.data.items.length);
        }
      }
    } catch (error) {
      ToasterMessage("error", error.response.data.message);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      if (!accessToken) {
        navigate("/login");
      } else {
        const response = await axios.patch(
          `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
          // '{\n    "quantity" : 1 ,\n    "size" : "S"\n}',
          {
            productId: productDetails._id,
          },
          {
            headers: {
              projectId: "4stjj1sb1x5a",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // console.log("response", response);
        if (response.status === 200) {
          setWishlisted(true);
          ToasterMessage("success", response.data.message);
        }
      }
    } catch (e) {
      ToasterMessage("error", e.response.data.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productDetails._id}`,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // console.log(response);

      if (response.status === 200) {
        setWishlisted(false);
        ToasterMessage("success", response.data.message);
      }
    } catch (error) {
      ToasterMessage("error", "Something went wrong");
    }
  };

  const handleSizeChange = (size, e) => {
    // console.log(size);
    setSize(size);
  };
  const handleGoToBag = () => {
    if (accessToken) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };
  // console.log('accessToken', accessToken);
  // console.log("product", productDetails);
  return (
    <div className="productinfo-wrapper">
      <ImageCarousel />
      <Row className="card-row">
        <Col md={6} sm={12} className="product-gallery">
          <div>
            <ImageGallery
              items={images}
              thumbnailPosition="left"
              useBrowserFullscreen={false}
              showPlayButton={false}
              slideOnThumbnailOver={true}
              showFullscreenButton={false}
              loading="lazy"
            />
          </div>
        </Col>
        <Col md={5} sm={12} className="details-wrapper">
          <div className="details-container">
            <h3 className="brand-name">{productDetails?.brand}</h3>
            <h3 className="product-name">{productDetails?.name}</h3>
            <div className="ratings">
              &#11088;{productDetails?.ratings.toFixed(2)}
            </div>

            <div className="price-section">
              <div className="selling-price">
                <span>₹</span>
                <h3>{productDetails?.price}</h3>
              </div>
              <p className="actual-price">₹1299</p>
              <h4 className="offer-percentage">65% OFF</h4>
            </div>
            <div className="inclusive-tax-text">inclusive of all taxes</div>
            <div className="tags">
              <p className="tag-offer">BUY 3 FOR 999</p>
              <p className="tag-fabric">100% COTTON</p>
            </div>
            <div className="tribe-text">
              TriBe members get an extra discount of ₹30 and FREE shipping.
            </div>
            <div className="colour-options-text">
              <h5>COLOUR OPTIONS:</h5>&nbsp;&nbsp;&nbsp;
              <span>{productDetails?.color}</span>
            </div>
            <div
              className="multi-color-block"
              style={{ backgroundColor: `${productDetails?.color}` }}
            ></div>
            <div>
              <h2 className="select-size-title">Select Size</h2>
            </div>
            <div className="size-container">
              {productDetails?.size?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`size-item ${
                      size === item ? "size-border" : ""
                    }`}
                    onClick={(e) => handleSizeChange(item, e)}
                    // style={size ? {backgroundColor:'yellow'} : {backgroundColor:"white"}}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="button-wrapper">
              {accessToken &&
              cartItems
                ?.map((item) => item.product?._id)
                .includes(productDetails?._id) ? (
                <Button className="add-to-bag" onClick={handleGoToBag}>
                  <LocalMallTwoToneIcon />
                  <span>GO TO BAG</span>
                </Button>
              ) : (
                <Button className="add-to-bag">
                  <LocalMallOutlinedIcon className="bag-icon" />
                  <span onClick={handleAddItemToCart}>ADD TO BAG</span>
                </Button>
              )}

              {/* checking if the product already exist in the wishlist */}
              {wishlistItems
                ?.map((item) => item.products?._id)
                .includes(productDetails?._id) ? (
                <Button
                  className="add-to-wishlist"
                  onClick={handleRemoveFromWishlist}
                >
                  <FavoriteIcon className="filled-heart-icon" />
                  <span>WISHLISTED</span>
                </Button>
              ) : (
                <Button
                  className="add-to-wishlist"
                  onClick={handleAddToWishlist}
                >
                  <FavoriteBorderOutlinedIcon className="heart-icon" />
                  <span>WISHLIST</span>
                </Button>
              )}
            </div>
            {/* <div className="accordion-container">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="accordion-title">
                    <ArticleOutlinedIcon className="accordion-icon" />
                    <div className="accordion-subtitle">
                      <p>Product Description</p>
                      <p>Manufacture, Care and Fit</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="accordion-body">
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: productDetails?.description,
                      }}
                    ></Typography>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="accordion-title">
                    <SwapHorizontalCircleOutlinedIcon className="accordion-icon" />
                    <div className="accordion-subtitle">
                      <p>15 Days Returns & Exchange</p>
                      <p>Know about return & exchange policy</p>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="accordion-body">
                    <Typography>
                      Easy returns upto 15 days of delivery. Exchange available
                      on select pincodes
                    </Typography>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="trustbadge-container">
              <div>
                <Image
                  src="https://images.bewakoof.com/web/trust-cart.svg"
                  className="trustbadge-img"
                  fluid
                  loading="lazy"
                  alt="offer"
                />
                <p className="trustbadge-title">100% SECURE PAYMENTS</p>
              </div>
              <div>
                <Image
                  src="https://images.bewakoof.com/web/Easy-Returns.svg"
                  className="trustbadge-img"
                  fluid
                  loading="lazy"
                  alt="offer"
                />
                <p className="trustbadge-title">
                  EASY RETURNS & INSTANT REFUNDS
                </p>
              </div>
              <div>
                <Image
                  src="https://images.bewakoof.com/web/Globe.svg"
                  className="trustbadge-img"
                  fluid
                  loading="lazy"
                  alt="offer"
                />
                <p className="trustbadge-title">SHIPPING GLOBALLY</p>
              </div>
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductInfo;
