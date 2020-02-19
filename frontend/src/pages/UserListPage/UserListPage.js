import React from "react";

import Navigation from "../../components/Navigation/Navigation";
import UserStatistics from "../../components/UserStatistics/UserStatistics";

const UserListPage = () => {
  return (
    <>
      <Navigation
        list={[
          { title: "Main page", path: "/", isActive: false },
          { title: "User statistics", path: "/users", isActive: true }
        ]}
      />
      <UserStatistics />
    </>
  );
};

export default UserListPage;
