const Router = require("@koa/router");
const { upload, addFileToSql } = require("../middleware/upload");
const { verifyUser, encryptUserPassword } = require("../middleware/user");
const { verifyAuthCertificate } = require("../middleware/auth");
const userController = require("../controller/user");

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/list", verifyAuthCertificate, userController.getUsers);

userRouter.get("/:id", verifyAuthCertificate, userController.getUser);

userRouter.post("/", verifyUser, encryptUserPassword, userController.createUser);
/**
 * 上传用户头像
 * 将头像信息添加进file数据库
 * 将头像文件id添加到用户数据库表中
 */
userRouter.post("/:id/avatar", verifyAuthCertificate, upload.single("file"), addFileToSql, userController.addAvatar);
userRouter.get("/:id/avatar", verifyAuthCertificate, userController.getAvatar);
module.exports = userRouter;
