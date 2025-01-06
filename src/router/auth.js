const Router = require("@koa/router");
const { verifyLogin } = require("../middleware/user");
const { createAuthCertificate } = require("../middleware/auth");

const authRouter = new Router({ prefix: "/login" });

authRouter.post("/", verifyLogin, createAuthCertificate);

module.exports = authRouter;
