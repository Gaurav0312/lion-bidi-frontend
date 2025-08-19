// src/components/Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* ✅ nested pages render here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
