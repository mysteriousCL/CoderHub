const articleService = require("../service/article");
const articleLabelService = require("../service/articleLabel");

class ArticleController {
  async createArticle(ctx, next) {
    // 获取用户参数
    const data = ctx.request.body;

    // 数据库中创建用户
    const res = await articleService.create({ ...data, user_id: ctx.user.id });

    // 返回数据
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getArticle(ctx, next) {
    const id = ctx.params.id;
    const res = await articleService.find(id);
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getArticleComments(ctx, next) {
    const id = ctx.params.id;
    const res = await articleService.moments(id);
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getArticleLabel(ctx, next) {
    // const id = ctx.params.id;
    // const res = await articleService.moments(id);
    // ctx.response.body = { code: 0, message: "success", data: res };
  }

  async addArticleLabels(ctx, next) {
    const labels = ctx.labels;
    // 将附加的标签添加进关系表
    for (const item of labels) {
      const existed = await articleLabelService.havItem(item.article_id, item.label_id);
      if (!existed) {
        await articleLabelService.create(item);
      }
    }

    // 将排除已有标签的新标签列表，进行添加
    ctx.response.body = { code: 0, message: "success", data: null };
  }

  async getArticles(ctx, next) {
    const { limit, offset } = ctx.request.query;
    const res = await articleService.all({ limit: limit || "20", offset: offset || "0" });
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async deleteArticle(ctx, next) {
    const id = ctx.params.id;
    const res = await articleService.delete(id);
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async updateArticle(ctx, next) {
    const id = ctx.params.id;
    const res = await articleService.update(id, ctx.request.body);
    ctx.response.body = { code: 0, message: "success", data: res };
  }
}

module.exports = new ArticleController();
