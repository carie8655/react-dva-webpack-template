import React, { Component } from "react";
import { Switch } from "dva/router";

import GlobalLayout from "../layouts/GlobalLayout";
import LandingLayout from "../layouts/LandingLayout";

export default class AppSwitch extends Component {
  render() {
    const { children } = this.props;

    if (this.props.location.pathname === "/") {
      return (
        <LandingLayout {...this.props}>
          <Switch>{children}</Switch>
        </LandingLayout>
      );
    }

    return (
      <GlobalLayout {...this.props}>
        <Switch>{children}</Switch>
      </GlobalLayout>
    );
  }
}
