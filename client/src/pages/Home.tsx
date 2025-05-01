import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import GitHub from "@/components/GitHub";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => {
  // Handle scroll to anchor links from URL on initial load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
