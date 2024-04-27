import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import BreadCumBox from "./BreadCumBox";
import ProductInfo from "./ProductInfo";
import Reviews from "./Reviews";

const SingleProductCard = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const baseURL = useBaseApi();
  // console.log(id);

  const fectchingProductDetails = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/ecommerce/product/${id}`,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setProductDetails(response.data.data);
      }
    } catch (e) {
      console.log("error while fetching product details", e);
    }
  };

  useEffect(() => {
    fectchingProductDetails();
  }, []);

  // console.log("product details", productDetails);
  return (
    <div className="signleproduct-wrapper">
      <BreadCumBox productDetails={productDetails} />
      <ProductInfo productDetails={productDetails} />
      {/* <Reviews productId={id}/> */}
    </div>
  );
};

export default SingleProductCard;
