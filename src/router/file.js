const Router = require("@koa/router");
const { upload, addFileToSql } = require("../middleware/upload");
const { sendFile } = require("../middleware/file");
const { verifyAuthCertificate, checkUpdatePermission } = require("../middleware/auth");

const fileController = require("../controller/file");

const FileRouter = new Router({ prefix: "/file" });

FileRouter.delete("/:id", verifyAuthCertificate, checkUpdatePermission("file"), fileController.deleteFile);
FileRouter.get("/:id", sendFile);
FileRouter.post("/upload", verifyAuthCertificate, upload.any(), addFileToSql, fileController.getFiles);

module.exports = FileRouter;
