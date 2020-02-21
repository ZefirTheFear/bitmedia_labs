import React from "react";

import CDImg from "../../assets/images/clean-design.svg";
import SDImg from "../../assets/images/secure-data.svg";
import RRImg from "../../assets/images/retina-ready.svg";

import "./AboutUs.scss";

const AboutUs = () => {
  const data = [
    {
      img: CDImg,
      title: "Clean Design",
      content: "Increase sales by showing true dynamics of your website."
    },
    {
      img: SDImg,
      title: "Secure Data",
      content: "Build your online store’s trust using Social Proof & Urgency."
    },
    {
      img: RRImg,
      title: "Retina Ready",
      content: "Realize importance of social proof in customer’s purchase decision."
    }
  ];

  return (
    <section className="about-us">
      <h4>
        Why <span>small business owners love</span> AppCo?
      </h4>
      <p className="about-us-paragraph">
        Our design projects are fresh and simple and will benefit your business greatly. Learn more
        about our work!
      </p>
      <div className="about-us__info">
        {data.map(item => (
          <div className="about-us__info-item" key={item.title}>
            <img src={item.img} alt={`${item.title} img`} />
            <h6>{item.title}</h6>
            <p className="about-us__info-item-paragraph">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
