import React from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Container = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Navbar />
      <main className="flex-grow px-4 gap-4 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default Container;
