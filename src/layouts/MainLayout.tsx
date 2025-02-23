import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div
      className="app container-fluid p-0 d-flex"
      style={{ minHeight: "100%" }}
    >
      <Navbar />
      <div className="flex-grow-1 h-100">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
