import React from "react";
import { Image } from "react-bootstrap";

import tshirt from "./../../../assets/images/printed-tshirt.webp";
import shirt from "./../../../assets/images/menShirts.jpg";
import shorts from "./../../../assets/images/shorts.jpg";
import jogger from "./../../../assets/images/joggers.webp";
import pyjamas from "./../../../assets/images/menPayjamas.webp";
import fullSleeveTshirt from "./../../../assets/images/full-sleeve-tshirts.jpg";

import { useNavigate } from "react-router-dom";

const TrendingCategoriesMen = () => {
  const navigate = useNavigate();
  const trendingCategoriesMen = {
    tshirt,
    shirt,
    shorts,
    jogger,
    pyjamas,
  };
 
  return (
    <div>
      <h5 className="trending-categories-title">TRENDING CATEGORIES</h5>
      <ul className="trending-categories-container">
        {Object.entries(trendingCategoriesMen).map(([key, value]) => (
          <li key={key}>
            <div>
              <Image
                src={value}
                alt={key}
                className="trending-categories-image"
                fluid
                onClick={()=> navigate(`/Men/${key}`)}
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCategoriesMen;
