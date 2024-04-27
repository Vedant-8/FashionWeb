import React, { useEffect, useState } from "react";

import axios from "axios";

import "./Bestsellers.css";
import { Container} from "react-bootstrap";
import Card from "../../card/Card";

const Bestsellers = () => {
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
  return (
    <div>
      <h3 className="bestsellers-title">BESTSELLERS</h3>
      <Container className="bestsellers-container" fluid>
      {
        bestsellersProducts.map((product, index)=>{
          return(
            <Card product={product} key={index}/>
          )
        })
      }
      </Container>
      
    </div>
  );
};

export default Bestsellers;
