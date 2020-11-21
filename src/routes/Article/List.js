import React, { Component } from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Card,
  Empty,
  Pagination,
  Tooltip,
  Button,
  Input,
  Divider,
  Select,
  Tag,
} from "antd";
import moment from "moment";
import "./List.less";
import { EyeFilled, HomeOutlined } from "@ant-design/icons";

import config from "../../config";
import Loading from "../../components/Loading";

const { Meta } = Card;

const mapStateToProps = (state) => {
  return {
    articles: _.get(state, "article.articles", undefined),
    article_types: _.get(state, "article.article_types", undefined),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute(payload, callback, loading) {
      dispatch({ type: "global/goToRoute", payload, callback, loading });
    },
    GET_AllArticle(payload, callback, loading) {
      dispatch({ type: "article/GET_AllArticle", payload, callback, loading });
    },
    GET_AllArticleType(payload, callback, loading, show) {
      dispatch({
        type: "article/GET_AllArticleType",
        payload,
        callback,
        loading,
        show,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ArticleList extends Component {
    state = {
      articles: undefined,
      paging: 1,
      maxPaging: 1,
      selectArticleType: "",
      selectSortBy: "createdAt",
      pageSize: 20,
      searchTempText: "",
      search: "",
    };

    componentDidMount = () => {
      const { GET_AllArticleType } = this.props;
      console.log(123);
      GET_AllArticleType();
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      const { GET_AllArticle, match } = nextProps;
      const { type } = match.params;
      if (type !== prevState.selectArticleType) {
        GET_AllArticle({ type });
        return {
          selectArticleType: type,
        };
      }

      if (nextProps.articles !== prevState.articles) {
        const maxPaging =
          nextProps.articles.length % prevState.pageSize > 0
            ? parseInt(nextProps.articles.length / prevState.pageSize, 10) + 1
            : parseInt(nextProps.articles.length / prevState.pageSize, 10);

        return {
          articles: nextProps.articles,
          paging: 1,
          maxPaging,
        };
      }
      return {};
    }

    renderFilterOption = () => {
      const { article_types } = this.props;
      const { selectArticleType, selectSortBy } = this.state;

      return (
        <div>
          <div className="filter-option">
            文章類型：
            <Select
              value={selectArticleType}
              style={{ width: 120 }}
              bordered={false}
              onChange={(e) => this.setState({ selectArticleType: e })}
            >
              <Select.Option value="all">全部</Select.Option>
              {_.map(article_types, (at) => (
                <Select.Option key={at.id} value={at.id}>
                  {at.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="filter-option">
            排序方式：
            <Select
              value={selectSortBy}
              style={{ width: 120 }}
              bordered={false}
              onChange={(e) => this.setState({ selectSortBy: e })}
            >
              <Select.Option value="createdAt">建立時間</Select.Option>
              <Select.Option value="updatedAt">更新時間</Select.Option>
              <Select.Option value="view">觀看次數</Select.Option>
            </Select>
          </div>
          <Divider style={{ marginTop: "6px" }} />
        </div>
      );
    };

    renderArticleList = () => {
      const { articles, goToRoute } = this.props;
      const { paging, selectSortBy, search, selectArticleType } = this.state;

      const tagColor = [
        "magenta",
        "red",
        "volcano",
        "orange",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple",
      ];

      const arr = _.chain(articles)
        .filter(
          (at) =>
            at.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            at.article_type.name.toLowerCase().indexOf(search.toLowerCase()) >
              -1
        )
        .filter((at) => {
          if (selectArticleType !== "all") {
            if (at.article_type_id === selectArticleType) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        })
        .sortBy((at) => moment(at[selectSortBy]))
        .reverse()
        .value();

      return (
        <Row gutter={24}>
          {arr.length === 0 ? (
            <div className="empty-result">
              <Empty description="查無符合條件的文章" />
            </div>
          ) : (
            _.map(arr, (article, index) => {
              if (index >= 20 * (paging - 1) && index < 20 * paging)
                return (
                  <Col
                    key={article.id}
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={24}
                    style={{ marginBottom: 24 }}
                  >
                    <Card
                      onClick={() => goToRoute(`/article/${article.id}`)}
                      hoverable
                      cover={
                        <div className="article-image">
                          <img
                            alt={article.title}
                            className="card-meta"
                            src={`${config.api}/file/${article.cover}`}
                          />
                          <div className="article-mask">{article.keyword}</div>
                        </div>
                      }
                    >
                      <Meta
                        title={
                          <div>
                            <Tag
                              color={
                                tagColor[
                                  parseInt(
                                    Math.random() * (tagColor.length - 1),
                                    10
                                  )
                                ]
                              }
                            >
                              {article.article_type.name}
                            </Tag>
                            {article.title}
                          </div>
                        }
                        description={
                          <div>
                            建立日期：
                            {moment(article.createdAt).format("YYYY/MM/DD")}
                            <div style={{ float: "right" }}>
                              <EyeFilled /> {article.view || 0}
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                );
            })
          )}
        </Row>
      );
    };

    render() {
      const { articles } = this.props;
      const { paging, maxPaging, pageSize, searchTempText } = this.state;

      return (
        <div className="article-list">
          <div className="topImage">
            <div className="title">
              所有文章
              <div className="breadcrumb">
                <HomeOutlined style={{ marginRight: "3px" }} />
                <span
                  onClick={() => goToRoute("/")}
                  className="breadcrumb-link"
                >
                  首頁
                </span>
                / 文章列表
              </div>
              <div className="search">
                <Input.Group compact>
                  <Input
                    allowClear
                    className="search-input"
                    placeholder="請輸入您想搜尋的文章"
                    size="large"
                    value={searchTempText}
                    style={{ width: "80%" }}
                    onChange={(e) =>
                      this.setState({ searchTempText: e.target.value })
                    }
                  />
                  <Button
                    type="primary"
                    style={{ width: "20%" }}
                    size="large"
                    onClick={() =>
                      this.setState({
                        search: searchTempText,
                        selectArticleType: "all",
                      })
                    }
                  >
                    搜尋
                  </Button>
                </Input.Group>
              </div>
            </div>
          </div>
          <div className="content">
            {this.renderFilterOption()}
            {_.isUndefined(articles) || _.isNull(articles) ? (
              <Loading />
            ) : (
              <div>
                {this.renderArticleList()}
                <div className="pagination">
                  <Pagination
                    current={paging}
                    total={maxPaging}
                    onChange={(page) => this.setState({ paging: page })}
                    pageSize={pageSize}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
);
