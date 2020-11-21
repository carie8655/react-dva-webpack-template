import React, { Component } from "react";
import { connect } from "dva";
import "./Detail.less";
import { Card } from "antd";
import { EyeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

import { FacebookIcon, TwitterIcon } from "react-share";

import config from "../../config";
import Loading from "../../components/Loading";

const mapStateToProps = (state) => {
  return {
    article: _.get(state, "article.article", undefined),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute(payload, callback, loading) {
      dispatch({ type: "global/goToRoute", payload, callback, loading });
    },
    GET_ArticleById(payload, callback, loading) {
      dispatch({
        type: "article/GET_ArticleById",
        payload,
        callback,
        loading,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ArticleDetail extends Component {
    state = {
      id: undefined,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      const { GET_ArticleById, match } = nextProps;
      const { id } = match.params;
      if (id !== prevState.id) {
        GET_ArticleById(id);
        return {
          id,
        };
      }
      return {};
    }

    render() {
      const { article, location } = this.props;
      const { pathname } = location;
      if (_.isUndefined(article)) {
        return <Loading />;
      }
      console.log(config.host, pathname);

      return (
        <div className="article-detail">
          <Helmet>
            <title>{article.title}</title>
            <meta name="description" content={article.meta} />
          </Helmet>
          <div className="header">
            <div
              className="topImage"
              style={{
                backgroundImage: `url(${config.api}/file/${article.cover})`,
              }}
            />
            <div className="mask">
              <div className="title">{article.title}</div>
              <div className="breadcrumb">{article.article_type.name}</div>
              <div className="breadcrumb">
                <ClockCircleOutlined className="icon" />
                {article.createdAt}
                <EyeOutlined className="icon" style={{ marginLeft: "24px" }} />
                {article.view}
              </div>
            </div>
          </div>
          <div className="content">
            <FacebookIcon
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${config.host}/${pathname}`
                )
              }
              size={32}
              round={true}
              style={{ cursor: "pointer" }}
            />
            <TwitterIcon
              onClick={() =>
                window.open(
                  `https://twitter.com/share?url=${config.host}/${pathname}&text=${article.title}`
                )
              }
              size={32}
              round={true}
              style={{ marginLeft: 6, cursor: "pointer" }}
            />
            <Card>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </Card>
          </div>
        </div>
      );
    }
  }
);
