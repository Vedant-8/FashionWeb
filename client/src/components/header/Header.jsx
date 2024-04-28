import React from "react";
import NavBar from "./navBar/NavBar";
import TopBar from "./topBar/TopBar";
import { ToastContainer } from "react-toastify";
import SideBar from "./sideBar/SideBar";

const Header = ({ isSearching, setIsSearching }) => {
  return (
    <div className="header-wrapper">
      <ToastContainer />
      <NavBar isSearching={isSearching} setIsSearching={setIsSearching} />
      {/* <SideBar/> */}
    </div>
  );
};

export default Header;
