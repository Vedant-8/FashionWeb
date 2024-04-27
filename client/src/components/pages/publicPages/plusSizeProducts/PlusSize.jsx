import React, { useEffect, useState } from "react";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import axios from "axios";
import ProductCard from "../../../productcard/ProductCard";
import { RingLoader } from "react-spinners";

const PlusSize = () => {
  const baseURL = useBaseApi();
  const [plussizeProducts, setPlussizeProducts] = useState([]);
  useEffect(() => {
    fetchingPlussizeProducts();
  }, []);
  const fetchingPlussizeProducts = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/ecommerce/clothes/products?filter={"size":"XXL"}&limit=1000`,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setPlussizeProducts(response.data.data);
      }
    } catch (error) {}
  };
  if (plussizeProducts.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <RingLoader
      color={'#FEC001'}
      aria-label="Loading Spinner"
      data-testid="loader"
      size={100}
    />
  </div>
    );
  }
  return (
    <div>
      <ProductCard products={plussizeProducts} />
    </div>
  );
};

export default PlusSize;
