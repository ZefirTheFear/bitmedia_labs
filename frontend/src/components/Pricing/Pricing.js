import React from "react";

import BImg from "../../assets/images/basic.png";
import SImg from "../../assets/images/standart.png";
import UImg from "../../assets/images/unlimited.png";

import "./Pricing.scss";

const Pricing = () => {
  const data = [
    {
      title: "Basic",
      img: BImg,
      price: "$29",
      content: `Push Notifications
Data Transfer
SQL Database
Search & SEO Analytics
24/7 Phone Support
2 months technical support
2+ profitable keyword`
    },
    {
      title: "Standard",
      img: SImg,
      price: "$149",
      content: `Push Notifications
Data Transfer
SQL Database
Search & SEO Analytics
24/7 Phone Support
2 months technical support
2+ profitable keyword`
    },
    {
      title: "Unlimited",
      img: UImg,
      price: "$390",
      content: `Push Notifications
Data Transfer
SQL Database
Search & SEO Analytics
24/7 Phone Support
2 months technical support
2+ profitable keyword`
    }
  ];
  return (
    <section className="pricing">
      <div className="pricing__inner">
        <h2 className="pricing__heading">Afforadble Pricing and Packages</h2>
        <h4 className="pricing__subheading">choose your best one</h4>
        <p className="pricing__paragraph">
          Monotonectally grow strategic process improvements vis-a-vis integrated resources.
        </p>
        <div className="pricing__plans">
          {data.map(item => (
            <div className="pricing__plans-item" key={item.title}>
              <h5>{item.title}</h5>
              <img src={item.img} alt={`${item.title} img`} />
              <h6>{item.price}</h6>
              <pre>
                <p>{item.content}</p>
              </pre>
              <button>Purchase now</button>
            </div>
          ))}
        </div>
        <p className="pricing__contact-us">
          If you need custom services or Need more? <span>Contact us</span>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
