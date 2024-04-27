import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import "./Wishlist.css";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import { useAccessToken } from "../../../contextApi/AccessTokenContext";
import { ToasterMessage } from "../../../../helper/toastHelper";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchingWishlistProducts();
  }, []);

  const baseURL = useBaseApi();

  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const {accessToken} = useAccessToken();

  const fetchingWishlistProducts = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setWishlistItems(response.data.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(wishlistItems);

  const handleAddToCart = async (event) => {
    // console.log(event.target.value);
    const id = event.target.value;
    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
        {
          quantity: 1,
          size: "S",
        },
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("response", response);

      if (response.status == 200) {
       ToasterMessage('success',response.data.message);
        setLoading(true);
        handleRemoveFromWishlist(id);
      }
    } catch (e) {
      ToasterMessage('error',"Something went wrong");
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      // console.log(id);
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`,
        {
          headers: {
            projectId: "4stjj1sb15a",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        ToasterMessage('success',response.data.message);
        if (response?.data?.data?.items) {
          setWishlistItems(response.data.data.items);
        }
        setLoading(false);
      }
    } catch (error) {
      ToasterMessage('error',"Something went wrong");
    }
  };

  const handleRemoveAllItems = async () => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/v1/ecommerce/wishlist`,
        {
          headers: {
            projectId: "projectId",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        ToasterMessage('success',response.data.message);
        setWishlistItems([]);
      }
    } catch (error) {
      ToasterMessage('error','Something went wrong');
    }
  };
  if(!accessToken)
  {
    navigate('/login');
    return;
  }
  if (wishlistItems.length !== 0) {
    if (loading) {
      return <h3>Loading...</h3>;
    }
    return (
      <div className="wishlist-wrapper">
        <div className="wishlist-container">
          {wishlistItems?.map((item, index) => {
            return (
              <div className="wishlist-item-container" key={index}>
                <CancelTwoToneIcon
                  className="wishlist-cross-icon"
                  onClick={() => handleRemoveFromWishlist(item.products._id)}
                  value={item.products._id}
                />
                <Image
                  src={item.products.displayImage}
                  alt={item.products.name}
                  fluid
                  className="wishlist-product-image"
                  onClick={()=>navigate(`/product/${item.products._id}`)}
                  loading="lazy"
                />
                <div className="wishlist-product-details">
                  <h3 className="wishlist-product-brand-name">Bewakoof®</h3>
                  <h3 className="wishlist-product-title">
                    {item.products.name}
                  </h3>
                  <div className="wishlist-product-price-container">
                    <div className="wishlist-product-selling-price-container">
                      <span className="wishlist-rs-symbol">₹</span>
                      <h3 className="wishlist-product-selling-price">
                        {item.products.price}
                      </h3>
                    </div>

                    <p className="wishlist-product-actual-price">₹3456</p>
                    <p className="wishlist-product-disc-percentage">65% OFF</p>
                  </div>
                  <Button
                    className="wishlist-add-to-bag"
                    onClick={handleAddToCart}
                    value={item.products._id}
                  >
                    ADD TO BAG
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="wishlist-remove-all-btn"
          onClick={handleRemoveAllItems}
        >
          <DeleteTwoToneIcon />
          Remove All Items
        </Button>
      </div>
    );
  } else {
    return (
      <div className="empty-wishlist-wrapper">
        <Image
          src="https://images.bewakoof.com/web/wishlistEmpty.svg"
          alt="empty-cart"
          fluid
          width="10%"
          loading="lazy"
        />
        <div className="empty-wishlist-title">Hey! Your wishlist is empty.</div>
        <div className="empty-wishlist-subtitle">
          Save your favourites here and make them yours soon!
        </div>
        <Button type="button" onClick={() => navigate("/")}>
          Shop Now
        </Button>
      </div>
    );
  }
};

export default Wishlist;
