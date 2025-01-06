const Router = require("@koa/router");

const { verifyAuthCertificate, checkUpdatePermission } = require("../middleware/auth");

const { verifyLabel } = require("../middleware/label");
const labelController = require("../controller/label");

const labelRouter = new Router({ prefix: "/label" });

// 获取标签列表
labelRouter.get("/list", verifyAuthCertificate, labelController.getLabels);

// 删除标签
labelRouter.delete("/:id", verifyAuthCertificate, checkUpdatePermission('label'), labelController.deleteLabel);

// 添加标签
labelRouter.post("/", verifyAuthCertificate, verifyLabel, labelController.createLabel);

module.exports = labelRouter;
