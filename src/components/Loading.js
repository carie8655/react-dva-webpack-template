import React, { Component } from "react";
import "./Loading.less";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="cssload-thecube">
          <div className="cssload-cube cssload-c1"></div>
          <div className="cssload-cube cssload-c2"></div>
          <div className="cssload-cube cssload-c4"></div>
          <div className="cssload-cube cssload-c3"></div>
        </div>
      </div>
    );
  }
}
