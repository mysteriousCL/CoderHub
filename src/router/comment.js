const Router = require("@koa/router");

const { verifyAuthCertificate, checkUpdatePermission } = require("../middleware/auth");

const { verifyComment } = require("../middleware/comment");
const commentController = require("../controller/comment");

const commentRouter = new Router({ prefix: "/comment" });

commentRouter.get("/list", verifyAuthCertificate, commentController.getComments);
/**
 * 回复评论
 */
commentRouter.post("/:id/reply", verifyAuthCertificate, verifyComment, commentController.replyComment);

commentRouter.get("/:id", verifyAuthCertificate, commentController.getComment);

commentRouter.delete("/:id", verifyAuthCertificate, checkUpdatePermission('comment'), commentController.deleteComment);
/**
 * 更新评论
 */
commentRouter.patch("/:id", verifyAuthCertificate, checkUpdatePermission('comment'), commentController.updateComment);

commentRouter.post("/", verifyAuthCertificate, verifyComment, commentController.createComment);

module.exports = commentRouter;
