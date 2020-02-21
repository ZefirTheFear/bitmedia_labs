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
        <Navigation list={[{ title: "Main page", path: "/" }, { title: "User statistics" }]} />
        <UserStatistics />
      </Wrapper>
      <Footer />
    </>
  );
};

export default UserListPage;
