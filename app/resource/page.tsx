import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tiptap from "../components/Tiptap";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow px-20 mt-5">
        <Tiptap />
      </section>
      <Footer />
    </div>
  );
};

export default page;
