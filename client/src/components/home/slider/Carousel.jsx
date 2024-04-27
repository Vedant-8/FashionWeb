// CarouselComponent.jsx

import React from "react";
import "./styles.css"; // Import the CSS file for styling
import { Carousel } from "react-bootstrap";

const Carousel = () => {
  const carouselItems = Array.from({ length: 9 }, (_, i) => i + 1); // Array of carousel items

  return (
    <div className="wrapper">
      <div className="carousel">
        {carouselItems.map((item, index) => (
          <div key={index} className="carousel__item">
            <div className="carousel__item-head">{item}</div>
            <div className="carousel__item-body">
              <h2 className="title">Title {item}</h2>
              {/* Additional content for item */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
