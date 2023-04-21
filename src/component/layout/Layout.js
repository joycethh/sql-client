import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SideBar from "../sidebar/SideBar";
import RightBar from "../rightbar/RightBar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  );
};

export default Layout;
