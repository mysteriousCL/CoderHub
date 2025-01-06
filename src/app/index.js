const Kow = require("koa");

const { setupMiddleware } = require("../middleware");
const { setupRouter } = require("../router");
const { setupAppListener } = require("./listener");

const app = new Kow();

setupMiddleware(app);
setupRouter(app);
setupAppListener(app);

module.exports = app;
