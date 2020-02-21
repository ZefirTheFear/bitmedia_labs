import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import UserListPage from "./pages/UserListPage/UserListPage";
import UserPage from "./pages/UserPage/UserPage";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users" component={UserListPage} />
          <Route path="/users/:userId" component={UserPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
