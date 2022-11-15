import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home/Home";
import Activity from "./activity/Activity";
import Send from "./send/send";

const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path={["/home", "/"]}
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path={["/activity"]}
          render={(props) => <Activity {...props} baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/send"
          render={(props) => <Send {...props} baseUrl={baseUrl} />}
        />

      </div>
    </Router>
  );
};

export default Controller;
