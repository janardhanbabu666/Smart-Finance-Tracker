import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/navbar";
import Footer from "./pages/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow pt-20 px-4">
        <Outlet />
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
