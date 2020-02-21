import React from "react";

import Hero from "../../components/Hero/Hero";
import AboutUs from "../../components/AboutUs/AboutUs";
import Start from "../../components/Start/Start";
import Pricing from "../../components/Pricing/Pricing";
import HomeFooter from "../../components/HomeFooter/HomeFooter";

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Start />
      <Pricing />
      <HomeFooter />
      {/* <div style={{ height: "300px" }}></div> */}
    </>
  );
};

export default HomePage;
