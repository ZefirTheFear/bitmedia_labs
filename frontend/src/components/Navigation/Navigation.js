import React from "react";

import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = props => {
  return (
    <div className="navigation">
      {props.list.map((item, index, arr) =>
        index !== arr.length - 1 ? (
          <span key={item.title} className="navigation__item">
            <Link to={item.path} className="navigation__link">
              {item.title}
            </Link>
            <span className="navigation__separator">&gt;</span>
          </span>
        ) : (
          <span key={item.title} className="navigation__item_active">
            {item.title}
          </span>
        )
      )}
    </div>
  );
};

export default Navigation;
