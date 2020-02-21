import React from "react";

import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import Footer from "../../components/Footer/Footer";

import "./UserListPage.scss";

const UserListPage = () => {
  return (
    <>
      <Header />
      <section className="user-list">
        <Navigation
          list={[
            { title: "Main page", path: "/", isActive: false },
            { title: "User statistics", path: "/users", isActive: true }
          ]}
        />
        <UserStatistics />
      </section>
      <Footer />
    </>
  );
};

export default UserListPage;
