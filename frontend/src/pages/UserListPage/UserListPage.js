import React from "react";

import Header from "../../components/Header/Header";
import Wrapper from "../../components/Wrapper/Wrapper";
import Navigation from "../../components/Navigation/Navigation";
import UserStatistics from "../../components/UserStatistics/UserStatistics";
import Footer from "../../components/Footer/Footer";

const UserListPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Navigation
          list={[
            { title: "Main page", path: "/", isActive: false },
            { title: "User statistics", path: "/users", isActive: true }
          ]}
        />
        <UserStatistics />
      </Wrapper>
      <Footer />
    </>
  );
};

export default UserListPage;
