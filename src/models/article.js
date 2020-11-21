import {
  GET_AllArticle,
  GET_ArticleById,
  GET_AllArticleType,
  GET_ArticleTypeById,
} from "../services/article";
import { effectError } from "../utils/handleError";
import { message } from "antd";

export default {
  namespace: "article",

  state: {},

  effects: {
    *GET_AllArticle({ payload, callback, loading }, { call, put }) {
      try {
        if (loading) loading(true);

        const response = yield call(GET_AllArticle, payload);

        yield [put({ type: "SAVE_Articles", payload: response.data })];
        // message.success(response.message, 1);

        if (loading) loading(false);

        if (callback) callback();
      } catch (error) {
        yield effectError(error, arguments[0], arguments[1]);
      }
    },
    *GET_ArticleById({ payload, callback, loading }, { call, put }) {
      try {
        if (loading) loading(true);

        const response = yield call(GET_ArticleById, payload);

        yield [put({ type: "SAVE_Article", payload: response.data })];
        message.success(response.message, 1);

        if (loading) loading(false);

        if (callback) callback();
      } catch (error) {
        yield effectError(error, arguments[0], arguments[1]);
      }
    },
    *GET_AllArticleType({ payload, callback, loading, show }, { call, put }) {
      try {
        if (loading) loading(true);

        const response = yield call(GET_AllArticleType, payload);

        yield put({ type: "SAVE_ArticleTypes", payload: response.data });
        if (show) {
          message.success(response.message, 1);
        }

        if (loading) loading(false);
        if (callback) callback();
      } catch (error) {
        yield effectError(error, arguments[0], arguments[1]);
      }
    },
    *GET_ArticleTypeById({ payload, callback, loading }, { call, put }) {
      try {
        if (loading) loading(true);

        const response = yield call(GET_ArticleTypeById, payload);
        yield put({ type: "SAVE_ArticleType", payload: response.data });
        message.success(response.message, 1);

        if (loading) loading(false);

        if (callback) callback();
      } catch (error) {
        yield effectError(error, arguments[0], arguments[1]);
      }
    },
    *GET_ArticlesByType({ payload, callback, loading }, { call, put }) {
      try {
        if (loading) loading(true);
        console.log(payload)
        // const response = yield call(GET_ArticleTypeById, payload);
        // yield put({ type: "SAVE_ArticleType", payload: response.data });
        // message.success(response.message, 1);

        if (loading) loading(false);

        if (callback) callback();
      } catch (error) {
        yield effectError(error, arguments[0], arguments[1]);
      }
    },
  },

  reducers: {
    SAVE_Articles(state, { payload }) {
      return {
        ...state,
        articles: payload,
      };
    },
    SAVE_Article(state, { payload }) {
      return {
        ...state,
        article: payload,
      };
    },
    SAVE_ArticleTypes(state, { payload }) {
      return {
        ...state,
        article_types: payload,
      };
    },
    SAVE_ArticleType(state, { payload }) {
      return {
        ...state,
        article_type: payload,
      };
    },
  },
};
