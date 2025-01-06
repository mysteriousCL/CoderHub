const Router = require("@koa/router");

const { verifyAuthCertificate, checkUpdatePermission } = require("../middleware/auth");

const { verifyArticle, verifyArticleLabel, verifyLabelExisted } = require("../middleware/article");
const articleController = require("../controller/article");

const articleRouter = new Router({ prefix: "/article" });

// 获取文章列表
articleRouter.get("/list", verifyAuthCertificate, articleController.getArticles);

// 获取文章详情
articleRouter.get("/:id", verifyAuthCertificate, articleController.getArticle);

// 获取文章的评论数据
articleRouter.get("/:id/comments", articleController.getArticleComments);

// 获取文章的标签
articleRouter.get("/:id/labels", articleController.getArticleLabel);

// 給文章添加标签
articleRouter.post(
  "/:id/labels",
  verifyAuthCertificate,
  verifyArticleLabel,
  verifyLabelExisted,
  articleController.addArticleLabels,
);

// 删除文章
articleRouter.delete("/:id", verifyAuthCertificate, checkUpdatePermission("article"), articleController.deleteArticle);

// 更新文章
articleRouter.patch("/:id", verifyAuthCertificate, checkUpdatePermission("article"), articleController.updateArticle);

// 添加文章
articleRouter.post("/", verifyAuthCertificate, verifyArticle, articleController.createArticle);

module.exports = articleRouter;
