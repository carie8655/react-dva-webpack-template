import request from "../utils/request";

export function GET_AllArticle(payload) {
  return request.get("/article/publish", payload);
}

export function GET_ArticleById(payload) {
  return request.get(`/article/id/${payload}`);
}

export function GET_AllArticleType() {
  return request.get("/article/type");
}

export function GET_ArticleTypeById(payload) {
  return request.get(`/article/type/id?id=${payload}`);
}
