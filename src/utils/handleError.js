import _ from "lodash";
import { message } from "antd";

// eslint-disable-next-line require-yield
export function* effectError(error, { type, payload }, { put }, validate) {
  const resStatus = _.get(error, "response.status");
  const errorMsg = _.get(error, "response.data.Message", null);

  if (resStatus === 404) {
    message.error("發生錯誤！");
    return _.get(error.response, "data", undefined);
  } else {
    if (_.isNull(errorMsg)) {
      message.error("發生錯誤！");
    } else {
      message.error(errorMsg);
    }
    return _.get(error.response, "data", undefined);
  }
}
