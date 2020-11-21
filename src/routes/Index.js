import React, { Component } from "react";
import { connect } from "dva";
import "./Index.less";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Index extends Component {
    render() {
      return <div className="index">Index Page</div>;
    }
  }
);
