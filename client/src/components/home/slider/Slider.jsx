import React from "react";
import "./Slider.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Image } from "react-bootstrap";

const Slider = () => {
  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const techResponsive = {
    0: { items: 1 },
    300: { items: 2 },
    600: { items: 3 },
  };

  const items = [
    {
      key: 1,
      imageSrc:
        "https://images.bewakoof.com/uploads/grid/app/ik-1x1-new--1--1699607681.jpg",
    },
    {
      key: 2,
      imageSrc:
        "https://images.bewakoof.com/uploads/grid/app/NEW-1x1-Joggers-1699357840.jpg",
    },
    {
      key: 3,
      imageSrc:
        "https://images.bewakoof.com/uploads/grid/app/NEW-1x1-OversizedSweatshirts-common-1699594711.jpg",
    },
    {
      key: 4,
      imageSrc:
        "https://images.bewakoof.com/uploads/grid/app/Women-Short-Tops-1x1-Banner-1699634146.jpg",
    },
    {
      key: 5,
      imageSrc:
        "https://images.bewakoof.com/uploads/grid/app/NEW-1x1-KnitPerfection-sweater-common-1699625976.jpg",
    },
  ];

  return (
    <div className="slider-container">
      <AliceCarousel
        mouseTracking
        items={items.map((item, index) => (
          <div key={item.key} className={index === 2 ? "central-item" : ""}>
            <Image
              src={item.imageSrc}
              onDragStart={handleDragStart}
              role="presentation"
              className="slider-images"
              loading="lazy"
              alt="offer-banner"
            />
          </div>
        ))}
        responsive={techResponsive}
        controlsStrategy="alternate"
        autoPlay={true}
        autoPlayInterval={2000}
        infinite={true}
        animationDuration={1500}
        disableDotsControls={true}
        disableButtonsControls={true}
      />
    </div>
  );
};

export default Slider;
