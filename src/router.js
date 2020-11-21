import React, { Component } from "react";
import _ from "lodash";
import { Route, Switch, routerRedux, withRouter } from "dva/router";
import PropTypes from "prop-types";

import AppSwitch from "./routes/AppSwitch";
import Index from "./routes/Index";
import About from './routes/About'
import ArticleList from './routes/Article/List';
import ArticleDetail from './routes/Article/Detail';
import ArticleTypeList from './routes/ArticleType/List';

const { ConnectedRouter } = routerRedux;

class Root extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  render() {
    const { children } = this.props;
    return children;
  }
}

const RouterRoot = withRouter(_.flow()(Root));

export default (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <RouterRoot {...props}>
        <Switch>
          <AppSwitch>
            <Route path="/" exact component={Index} />
            <Route path="/about" exact component={About} />
            <Route path="/article/list/:type" exact component={ArticleList} />
            <Route path="/article/:id" exact component={ArticleDetail} />
            <Route path="/article/type/list/" exact component={ArticleTypeList} />
          </AppSwitch>
        </Switch>
      </RouterRoot>
    </ConnectedRouter>
  );
};
