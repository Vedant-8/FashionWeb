import React from "react";
import tshirt from "./../../../assets/images/printed-tshirt-women.webp";
import jumpsuit from "./../../../assets/images/jumpsuit.jpg";
import jeans from "./../../../assets/images/womenPyjamas.jpg";
import jogger from "./../../../assets/images/joggers-women.webp";
import kurti from "./../../../assets/images/dresses.webp";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";

const TrendingCategoriesWomen = () => {
    const navigate = useNavigate();

  const trendingCategoriesWomen = {
    tshirt,
    jumpsuit,
    jeans,
    jogger,
    kurti,
  };
  return (
    <div>
      <ul className="trending-categories-container">
        {Object.entries(trendingCategoriesWomen).map(([key, value]) => (
          <li key={key}>
            <div>
              <Image
                src={value}
                alt={key}
                className="trending-categories-image"
                fluid
                onClick={() => navigate(`/Women/${key}`)}
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCategoriesWomen;
