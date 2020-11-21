import React, { Component } from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Card,
  Pagination,
  Tooltip,
  Divider,
  Select,
  Button,
  Input,
  Tag,
} from "antd";
import moment from "moment";
import "./List.less";
import { EyeFilled, HomeOutlined, AppstoreOutlined } from "@ant-design/icons";

import config from "../../config";
import Loading from "../../components/Loading";

const { Meta } = Card;

const mapStateToProps = (state) => {
  return {
    article_types: _.get(state, "article.article_types", undefined),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute(payload, callback, loading) {
      dispatch({ type: "global/goToRoute", payload, callback, loading });
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
      article_types: undefined,
      paging: 1,
      maxPaging: 1,
      selectSortBy: "createdAt",
      pageSize: 20,
      searchTempText: "",
      search: "",
    };

    componentDidMount = () => {
      const { GET_AllArticleType } = this.props;
      GET_AllArticleType();
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.article_types !== prevState.article_types) {
        const maxPaging =
          nextProps.article_types.length % prevState.pageSize > 0
            ? parseInt(
                nextProps.article_types.length / prevState.pageSize,
                10
              ) + 1
            : parseInt(nextProps.article_types.length / prevState.pageSize, 10);

        return {
          article_types: nextProps.article_types,
          paging: 1,
          maxPaging,
        };
      }
      return {};
    }

    renderFilterOption = () => {
      const { selectSortBy } = this.state;

      return (
        <div>
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
            </Select>
          </div>
          <Divider style={{ marginTop: "6px" }} />
        </div>
      );
    };

    renderArticleList = () => {
      const { article_types, goToRoute } = this.props;
      const { paging, selectSortBy, search } = this.state;

      const arr = _.chain(article_types)
        .sortBy((at) => moment(at[selectSortBy]))
        .filter(
          (at) => at.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
        .reverse()
        .value();

      return (
        <Row gutter={24}>
          {_.map(arr, (article, index) => {
            if (index >= 20 * (paging - 1) && index < 20 * paging)
              return (
                <Col
                  key={article.id}
                  xl={8}
                  lg={8}
                  md={8}
                  sm={12}
                  xs={24}
                  style={{ marginBottom: "24px" }}
                >
                  <Tooltip title="點擊以查看文章">
                    <Card
                      onClick={() => goToRoute(`/article/list/${article.id}`)}
                      hoverable
                      cover={
                        <img
                          alt={article.name}
                          className="card-meta"
                          src={`${config.api}/file/${article.cover}`}
                        />
                      }
                    >
                      <Meta
                        title={article.name}
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
                  </Tooltip>
                </Col>
              );
          })}
        </Row>
      );
    };

    render() {
      const { goToRoute, article_types } = this.props;
      const { paging, maxPaging, pageSize, searchTempText } = this.state;

      return (
        <div className="article-type-list">
          <div className="topImage">
            <div className="title">
              所有文章類別
              <div className="breadcrumb">
                <HomeOutlined style={{ marginRight: "3px" }} />
                <span
                  onClick={() => goToRoute("/")}
                  className="breadcrumb-link"
                >
                  首頁
                </span>{" "}
                / 文章類別列表
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
            {_.isUndefined(article_types) ||
            _.isNull(article_types) ? (
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
