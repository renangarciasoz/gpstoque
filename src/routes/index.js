import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Login from "../pages/Login";
import Application from "../pages/Application";

import history from "./history";

import requireAuth from '../utils/requireAuth';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/application" component={requireAuth(Application)} />
      {/* <Route path="/application/support-area/request-list" component={requireAuth(Application)} /> */}
    </Switch>
  </ConnectedRouter>
);

export default Routes;