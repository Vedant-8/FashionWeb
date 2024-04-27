import React, { useEffect, useState } from "react";
import ProductCard from "../../productcard/ProductCard";
import axios from "axios";
import { RingLoader } from "react-spinners";

const BestsellerFeaturesCategories = () => {
  const [bestsellersProducts, setBestsellersProducts] = useState([]);

  useEffect(() => {
    fetchingBestsellers();
  }, []);

  const fetchingBestsellers = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={%22rating%22%3A1}",
        {
          headers: {
            projectId: "4stjj1sb1x5a",
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setBestsellersProducts(response.data.data);
      }
    } catch (error) {
      console.log(e);
    }
  };
  if (bestsellersProducts.length === 0) {
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
      <ProductCard products={bestsellersProducts} />
    </div>
  );
};

export default BestsellerFeaturesCategories;
