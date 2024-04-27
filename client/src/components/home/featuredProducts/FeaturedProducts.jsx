import React from "react";
import { Container, Image } from "react-bootstrap";
import "./FeaturedProducts.css";
import newArrivals from "./../../../assets/images/newarrivals.png";
import bestsellers from "./../../../assets/images/bestsellers.png";
import winterwear from "./../../../assets/images/winterwear.png";
// import officialcollaborations from "./../../../assets/images/officialcollaborations.png";
import customization from "./../../../assets/images/customization.png";
import combos from "./../../../assets/images/combos.gif";
// import couponoffers from "./../../../assets/images/couponoffers.png";
// import vote from "./../../../assets/images/vote.png";
import plussize from "./../../../assets/images/plussize.png";
// import lastsizeleft from "./../../../assets/images/lastsizeleft.png";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    title: "New Arrivals",
    src: newArrivals,
    onClick: "newArrivals",
  },
  { title: "Bestsellers", src: bestsellers, onClick: "/bestseller" },
  { title: "Winterwear", src: winterwear, onClick: "/winterwear" },
  {
    title: "Trending",
    src: combos,
    onClick: "/trending",
  },
  { title: "Tshirts", src: customization, onClick: "/Men/tshirt" },
  { title: "Plus Size", src: plussize, onClick: "/plus-size" },
];
const FeaturedProducts = () => {
  const navigate = useNavigate();
  return (
    <div className="features-wrapper">
      <div className="features-container">
        <ul className="features-list">
          {featuredProducts.map((item) => (
            <li className="featured-product" key={item.title}>
              <div className="slider-inner">
                <Image
                  src={item.src}
                  alt={item.title}
                  className="slider-image"
                  onClick={() => navigate(item.onClick)}
                  loading="lazy"
                />
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProducts;
