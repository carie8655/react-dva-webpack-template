const apiConfig = {
  protocol: process.env.API_PROTOCOL || "http",
  host: process.env.API_HOST || "localhost",
  port: process.env.API_PORT || 80,
  prefix: process.env.API_PREFIX || "",
};

const hostConfig = {
  protocol: process.env.APP_PROTOCOL || "http",
  host: process.env.APP_HOST || "localhost",
  port: process.env.APP_PORT || 80,
  prefix: process.env.APP_PREFIX || "",
};

export default {
  api: `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}${apiConfig.prefix}`,
  host: `${hostConfig.host}:${hostConfig.port}${hostConfig.prefix}`,
};
