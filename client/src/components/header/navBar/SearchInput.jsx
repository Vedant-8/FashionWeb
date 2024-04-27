import React, { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { useBaseApi } from "../../contextApi/BaseDomainContext";
import ProductCard from "../../productcard/ProductCard";
import { useNavigate } from "react-router-dom";
import { productsContext } from "../../contextApi/ProductsContext";
import { ToasterMessage } from "../../../helper/toastHelper";
const SearchInput = ({ isSearching, setIsSearching }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  // const [searchResults, setSearchResults] = useState([]);

  const { products, setProducts } = productsContext();

  const baseApi = useBaseApi();

  const navigate = useNavigate();
  useEffect(() => {
    const timeOutData = setTimeout(() => {
      fetchingProducts();
    }, 800);
    return ()=>clearTimeout(timeOutData);
  }, [searchTerm]);

  async function fetchingProducts() {
    if (searchTerm?.trim() === "") {
      // If the search query is empty, clear the results and return
      setIsSearching(false);
      setProducts([]);
      navigate('/')
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${baseApi}/api/v1/ecommerce/clothes/products?search={"name":"${searchTerm}", "description":"${searchTerm}"}&limit=1000`,
        {
          headers: {
            projectID: "4stjj1sb1x5a",
          },
        }
      );

      const result = await response.json();
      console.log("response", result);

      if(response.status===200)
      {

        setProducts(result.data);
      }
      navigate(`/${searchTerm}`)

      //  console.log("response", result.data);
      // console.log('products', products);
      setLoading(false);
    } catch (e) {
      ToasterMessage('error',"Error fetching data. Please try again.");
      setLoading(false);
    }
  }

  // console.log(setProducts, "setproducts");
  // const[isSearching, setIsSearching]= useState(false);
  // console.log(products, "products")

  function handleSearch(e) {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);
  }

  return (
    <div className="navbar-search-section">
      <SearchIcon className="search-icon" />
      <input
        placeholder="Search by product, category or collection"
        className="search-box"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
