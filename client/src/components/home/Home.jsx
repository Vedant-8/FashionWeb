import React, { useState } from "react";
import BottomNavbar from "./bottomNavbar/BottomNavbar";
import Slider from "./slider/Slider";
import FeaturedProducts from "./featuredProducts/FeaturedProducts";
import "./Home.css";
import { Image } from "react-bootstrap";
import Bestsellers from "./bestSellers/Bestsellers";
import { useNavigate } from "react-router-dom";
import TrendingCategoriesMen from "./trendingCategories/TrendingCategoriesMen";
import TrendingCategoriesWomen from "./trendingCategories/TrendingCategoriesWomen";

const Home = ({ isSearching, setIsSearching }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
    console.log("Dark mode toggled:", isDarkMode);
  };

  return (
    <div className={`home-container ${isDarkMode ? "dark-mode" : ""}`}>
      <>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <BottomNavbar />
        <Slider />
        <FeaturedProducts />
        <TrendingCategoriesMen />
        <TrendingCategoriesWomen />
        <Bestsellers />
      </>
    </div>
  );
};

export default Home;
