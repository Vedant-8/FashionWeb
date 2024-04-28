import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavBar.css";
import SideBar from "../sideBar/SideBar";
import SearchInput from "./SearchInput";
import Admin from "./Admin";
import { useCartItemsNumber } from "../../contextApi/CartItemsNumberContext";
import { useAccessToken } from "../../contextApi/AccessTokenContext";
import DropDown from "./DropDown";

const NavBar = ({ isSearching, setIsSearching }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [gender, setGender] = useState("");

  // let accessToken = localStorage.getItem("accessToken");
  // const cartItemsNumber = localStorage.getItem('cartItems');

  const { cartItemsNumber, setCartItemsNumber } = useCartItemsNumber();

  const { accessToken } = useAccessToken();
  // console.log('cartNumber',cartItemsNumber);

  // console.log('accessToken' ,accessToken);

  const handleMenuBarClick = () => {
    setShowMenu(!showMenu);
    // console.log('clicked');
  };
  const handleMenCategoriesClick = (gender) => {
    setShowMenDropdown(!showMenDropdown);
    setGender(gender);
    // console.log(gender);
  };
  const handleWomenCategoriesClick = (gender) => {
    setShowWomenDropdown(!showWomenDropdown);
    setGender(gender);
    // console.log(gender);
  };
  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-left-items">
          <div className="navbar-logo">
            <Link to="/">
              <img
                src="...../assets/images/navbar-logo.png"
                alt="InsideOut"
                className="logo"
                loading="lazy"
              />
            </Link>
          </div>
        </div>

        <div className="mobile-screen-menu">
          <MenuIcon className="menubar-icon" onClick={handleMenuBarClick} />
          <Link to="/">
            <img
              src="./assests/images/navbar-logo.png"
              alt="InsideOut"
              className="logo"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="navbar-right-items">
          <SearchInput
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
          {accessToken ? (
            <Admin />
          ) : (
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          )}

          <Link
            to={accessToken === "" ? "/login" : "/wishlist"}
            className="navbar-item"
          >
            <FavoriteBorderIcon />
          </Link>
          <Link
            to={accessToken === "" ? "/login" : "/cart"}
            className="navbar-item"
          >
            <ShoppingBagOutlinedIcon />
            {cartItemsNumber > 0 && accessToken != "" && (
              <span className="navbar-cart-items-number">
                {cartItemsNumber}
              </span>
            )}
          </Link>
        </div>
        {showMenu && <SideBar handleMenuBarClick={handleMenuBarClick} />}
      </div>
    </div>
  );
};

export default NavBar;
