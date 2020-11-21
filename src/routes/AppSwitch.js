import React, { Component } from "react";
import { Switch } from "dva/router";

import GlobalLayout from "../layouts/GlobalLayout";

export default class AppSwitch extends Component {
  render() {
    const { children } = this.props;

    return (
      <GlobalLayout {...this.props}>
        <Switch>{children}</Switch>
      </GlobalLayout>
    );
  }
}
