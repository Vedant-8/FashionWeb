import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import axios from "axios";
import ProductCard from "../../../productcard/ProductCard";
import { RingLoader } from "react-spinners";

const CategoryProduct = () => {
  const { category, gender } = useParams();

  const [categoryProduct, setCategoryProduct] = useState([]);

  const baseURL = useBaseApi();

  // console.log(category, gender);
  useEffect(() => {
    fetchingCategoriesItems();
  }, [category, gender]);

  const fetchingCategoriesItems = async () => {
    const response = await axios.get(
      `${baseURL}/api/v1/ecommerce/clothes/products?filter={"subCategory":"${category}", "gender":"${gender}"}&limit=1000`,
      {
        headers: {
          projectId: "4stjj1sb1x5a",
        },
      }
    );
    // console.log(response);
    if (response.status === 200) {
      setCategoryProduct(response.data.data);
    }
  };
  console.log(categoryProduct);
  if (categoryProduct.length === 0) {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <RingLoader
          color={'#FEC001'}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return <ProductCard products={categoryProduct} />;
};

export default CategoryProduct;
