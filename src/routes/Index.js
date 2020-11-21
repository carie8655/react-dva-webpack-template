import React, { Component } from "react";
import { connect } from "dva";
import _ from "lodash";
import { Button } from "antd";
import "./Index.less";

import title from "../assets/Title.jpg";
import test from "../assets/Test.jpg";
import cover from "../assets/Cover01.jpg";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute(payload, callback, loading) {
      dispatch({ type: "global/goToRoute", payload, callback, loading });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Index extends Component {
    render() {
      const { goToRoute } = this.props;
      return (
        <div className="index">
          <div className="mask" />
          <div className="content">
            <div className="center-content">
              <div className="inner">
                <div className="title">
                  歡迎來到
                  <br />
                  Coding A-Z的世界
                </div>
                <div className="descript">
                  Coding
                  A-Z為一個公開開放的平台，網站內文章內容提供轉載與交流，可直接經由FB分享鈕分享出去，但網站文章內容禁止直接轉貼無註明出處。
                  <br />
                  <div style={{ textAlign: "center", padding: 12 }}>
                    <div className="btn" onClick={() => goToRoute('/article/list/all')}>
                      開始使用
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
