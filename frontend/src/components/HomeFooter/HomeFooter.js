import React from "react";

import "./HomeFooter.scss";

const HomeFooter = () => {
  return (
    <footer className="home-footer">
      <div className="home-footer__inner">
        <form className="home-footer__form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </form>
        <div className="home-footer__floor">
          <div>AppCo</div>
          <div>All rights reserved by ThemeTags</div>
          <div>Copyrights © 2019.</div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
