import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";
import { useAccessToken } from "./AccessTokenContext";
const StoreWishlistProductContext = createContext();

const WishlistProductsContext = ({children}) => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const {accessToken} = useAccessToken();
  // const accessToken = JSON.parse(localStorage.getItem("accessToken"));


  const fetchingWishlistProducts = async () => {
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          headers: {
            projectId: "4stjj1sb1x5a",
            Authorization:
            `Bearer ${accessToken}`
          },
        }
      );

      console.log(response);
    } 
    catch (e) {}
  };
  
  return (
    <StoreWishlistProductContext.Provider
      value={{ wishlistProducts, setWishlistProducts, fetchingWishlistProducts }}
    >
      {children}
    </StoreWishlistProductContext.Provider>
  );
};

export default WishlistProductsContext;

export const wishlistProductsContext = () =>useContext(StoreWishlistProductContext);
