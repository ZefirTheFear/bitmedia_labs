import React from "react";

import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = props => {
  return (
    <div className="navigation">
      {props.list.map((item, index, arr) => (
        <span key={item.title}>
          <Link
            to={item.path}
            className={"navigation__link" + (item.isActive ? " navigation__link_active" : "")}
          >
            {item.title}
          </Link>
          {index !== arr.length - 1 ? <span className="navigation__separator">&gt;</span> : null}
        </span>
      ))}
    </div>
  );
};

export default Navigation;
