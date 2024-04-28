import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../components/home/Home";
import Login from "../components/pages/AuthPages/login/Login";
import Signup from "../components/pages/AuthPages/signup/Signup";
import Cart from "../components/pages/privatePages/cart/Cart";
import Wishlist from "../components/pages/privatePages/wishlist/Wishlist";
import SingleProductCard from "../components/pages/publicPages/singleProductCard/SingleProductCard";
import Checkout from "../components/pages/privatePages/checkout/Checkout";
import MyAccount from "../components/pages/privatePages/myAccount/MyAccount";
import OrderHistory from "../components/pages/privatePages/orderHistory/OrderHistory";
import SingleOrder from "../components/pages/privatePages/singleOrder/SingleOrder";
import Error404 from "../components/pages/error/Error404";
import OrderSuccess from "../components/pages/privatePages/orderSuccess/OrderSuccess";
import CategoryProduct from "../components/pages/publicPages/categorieProducts/CategoryProduct";
import Men from "../components/pages/publicPages/menProducts/Men";
import Women from "../components/pages/publicPages/womenProducts/Women";
import WinterWear from "../components/pages/publicPages/winterWearProducts/WinterWear";
import PlusSize from "../components/pages/publicPages/plusSizeProducts/PlusSize";
import SearchDisplay from "../components/header/navBar/SearchDisplay";
import NewArrivals from "../components/home/featuredProducts/NewArrivals";
import BestsellerFeaturesCategories from "../components/home/featuredProducts/BestsellerFeaturesCategories,=";
import Trending from "../components/home/featuredProducts/Trending";
import Footer from "../components/footer/Footer";

const Routers = ({ isSearching, setIsSearching }) => {
  return (
    <div className="routes-container">
      <Routes>
        <Route
          path="/"
          element={
            <Home isSearching={isSearching} setIsSearching={setIsSearching} />
          }
        />
        <Route path="/:searchTerm" element={<SearchDisplay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<SingleProductCard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/account/orders" element={<OrderHistory />} />
        <Route path="/account/orders/:id" element={<SingleOrder />} />
        <Route path="/:gender/:category" element={<CategoryProduct />} />
        <Route path="/account/orders/ordersucces" element={<OrderSuccess />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/winterwear" element={<WinterWear />} />
        <Route path="/plus-size" element={<PlusSize />} />
        <Route path="/newArrivals" element={<NewArrivals />} />
        <Route path="/bestseller" element={<BestsellerFeaturesCategories />} />
        <Route path="/trending" element={<Trending />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default Routers;
