import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import UserListPage from "./pages/UserListPage/UserListPage";
import UserPage from "./pages/UserPage/UserPage";

import "./App.scss";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app__inner">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UserListPage} />
            <Route path="/users/:userId" component={UserPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
