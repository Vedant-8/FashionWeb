import React, { useEffect, useState } from "react";
import { useBaseApi } from "../../../contextApi/BaseDomainContext";
import axios from "axios";
import ProductCard from "../../../productcard/ProductCard";
import { RingLoader } from "react-spinners";
import { ToasterMessage } from "../../../../helper/toastHelper";

const Men = () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [loading, setLoading]= useState(true);
  useEffect(() => {
    fetchingMensProducts();
  }, []);
  const baseURL = useBaseApi();
  const fetchingMensProducts = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/ecommerce/clothes/products?filter={"gender":"Men"}&limit=1000`,
        {
          headers: {
            projectId: "4stjj1sb1x5a",
          },
        }
      );
      console.log(response);
      if(response.status === 200)
      {
        setMensProducts(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      // ToasterMessage('error',error)
      console.log(error);
      setLoading(false);
    }
  }
  if(loading)
  {
    return <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    <RingLoader
      color={'#FEC001'}
      aria-label="Loading Spinner"
      data-testid="loader"
      size={100}
    />
  </div>
  }
  return <div>
    <ProductCard products={mensProducts}/>
  </div>;
};

export default Men;
