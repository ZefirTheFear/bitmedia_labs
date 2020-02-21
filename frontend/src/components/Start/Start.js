import React from "react";

import macImg from "../../assets/images/macbook.png";

import "./Start.scss";

const Start = () => {
  return (
    <section className="start">
      <div className="start__top"></div>
      <div className="start__inner">
        <div className="start__inner-left">
          <div className="start__inner-text-block">
            <h3 className="start__inner-heading">Start Managing your apps business, more faster</h3>
            <p className="start__inner-paragraph">
              Objectively deliver professional value with diverse web-readiness. Collaboratively
              transition wireless customer service without goal-oriented catalysts for change.
              Collaboratively.
            </p>
          </div>
          <button className="start__btn">Learn More</button>
        </div>
        <div className="start__inner-mac">
          <img src={macImg} alt="mac-img" />
        </div>
      </div>
    </section>
  );
};

export default Start;
