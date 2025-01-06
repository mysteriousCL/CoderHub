const fs = require("fs");

/**
 * TODO 35
 * @param app
 */
function setupRouter(app) {
  const routers = [];
  fs.readdirSync(__dirname).forEach((path) => {
    if (path !== "index.js") {
      const router = require(`./${path}`);
      app.use(router.routes()).use(router.allowedMethods());
    }
  });
}

module.exports = {
  setupRouter,
};
