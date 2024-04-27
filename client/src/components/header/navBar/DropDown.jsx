import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const DropDown = ({ gender }) => {
  const [categories, setCartegories] = useState([]);
  // useEffect(() => {
  //   fetchingCartegories();
  // }, []);

  // const fetchingCartegories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories",
  //       {
  //         headers: {
  //           projectId: "4stjj1sb1x5a",
  //         },
  //       }
  //     );
  //     // console.log("categories", response.data.data);
  //     setCartegories(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //   const handleCategoryClick = async (e)=>{
  //     const categoryName = e.target.value
  //   }

  const menCategories = [
    "hoodie",
    "jeans",
    "jogger",
    "kurta",
    "pyjamas",
    "shirt",
    "shorts",
    "sweater",
    "tracksuit",
    "trouser",
    "tshirt",
  ];
  const womenCategories = [
    "jeans",
    "jogger",
    "jumpsuit",
    "kurti",
    "shirt",
    "tshirt",
  ];
  // const gender = "Women";
  // console.log(gender);
  //   if (gender === "Men") {
  //     return (
  //       <div className="categories-dropdown-wrapper">
  //         <ul className="categories-dropdown-container">
  //           {menCategories.map((category) => {
  //             return (
  //               <li key={category}>
  //                 <Link
  //                   to={`/${gender}/${category}`}
  //                   className="categories-dropdown-link"
  //                 >
  //                   {category}
  //                 </Link>
  //               </li>
  //             );
  //           })}
  //         </ul>
  //       </div>
  //     );
  //   }
  //   else
  //   {
  //     return (
  //       <div className="categories-dropdown-wrapper">
  //         <div className="categories-dropdown-container">
  //           {womenCategories.map((category) => {
  //             return (
  //               <div key={category}>
  //                 <Link
  //                   to={`/${gender}/${category}`}
  //                   className="categories-dropdown-link"
  //                 >
  //                   {category}
  //                 </Link>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     );
  //   }
  // };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="categories-dropdown"
      >
        {gender}
      </Dropdown.Toggle>
      <Dropdown.Menu className="categories-dropdown-menu">
        {gender === "Men"
          ? menCategories.map((category, index) => {
              return (
                <Dropdown.Item className="categories-dropdown-item" key={index}>
                  <Link
                    to={`/${gender}/${category}`}
                    className="categories-dropdown-link"
                  >
                    {category}
                  </Link>
                </Dropdown.Item>
              );
            })
          : womenCategories.map((category, index) => {
              return (
                <Dropdown.Item className="categories-dropdown-item" key={index}>
                  <Link
                    to={`/${gender}/${category}`}
                    className="categories-dropdown-link"
                  >
                    {category}
                  </Link>
                </Dropdown.Item>
              );
            })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default DropDown;
