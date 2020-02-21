import React from "react";

import { Link } from "react-router-dom";

import phoneImg from "../../assets/images/mobile.png";

import "./Hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__inner-left">
          <div className="hero__inner-logo">AppCo</div>
          <div className="hero__inner-text-block">
            <h2 className="hero__inner-heading">
              <span>Brainstorming</span> for desired perfect Usability
            </h2>
            <p className="hero__inner-paragraph">
              Our design projects are fresh and simple and will benefit your business greatly. Learn
              more about our work!
            </p>
          </div>
          <Link to="/users" className="hero__inner-link">
            <button>View Stats </button>
          </Link>
        </div>
        <div className="hero__inner-phone">
          <img src={phoneImg} alt="phone-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
