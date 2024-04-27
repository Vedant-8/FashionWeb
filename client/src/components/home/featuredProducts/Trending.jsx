import React, { useEffect, useState } from "react";
import ProductCard from "../../productcard/ProductCard";
import axios from "axios";
import { RingLoader } from "react-spinners";

const Trending = () => {
  const [trendingProducts, settrendingProducts] = useState([]);
  useEffect(() => {
    fetchingTrending();
  }, []);
  const fetchingTrending = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=100&filter={%22sellerTag%22%3A%20%22trending%22}",
        {
          headers: {
            projectId: "4stjj1sb1x5a",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        settrendingProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (trendingProducts.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RingLoader
          color={"#FEC001"}
          aria-label="Loading Spinner"
          data-testid="loader"
          size={100}
        />
      </div>
    );
  }
  return (
    <div>
      <ProductCard products={trendingProducts} />
    </div>
  );
};

export default Trending;
