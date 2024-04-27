import React from "react";
import "./ProductCard.css";
import Card from "../card/Card";
import { useLocation } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
const ProductCard = ({ products }) => {
  const param = useLocation();
  const title = param.pathname.replace("/", "");
  if (products.length === 0) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="https://www.shuvautsav.com/frontend/dist/images/logo/no-item-found-here.png"
          fluid
          loading="lazy"
          alt="no-item-found"
        />
      </Container>
    );
  }
  return (
    <>
      <h3 className="search-title">
        Search result for : {title}&nbsp;<span>{products.length}</span>
      </h3>
      <div className="product-container">
        {products?.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default ProductCard;
