const commentService = require("../service/comment");

class CommentController {
  async createComment(ctx, next) {
    // 获取用户参数
    const comment = ctx.request.body;

    // 数据库中创建用户
    const res = await commentService.create({ ...comment, user_id: ctx.user.id });

    // 返回数据
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getComment(ctx, next) {
    const id = ctx.params.id;
    const res = await commentService.find("id", id);
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getComments(ctx, next) {
    const { limit, offset } = ctx.request.query;
    const res = await commentService.all({ limit: limit || "20", offset: offset || "0" });
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async deleteComment(ctx, next) {
    const id = ctx.params.id;
    const res = await commentService.delete(id);
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async updateComment(ctx, next) {
    const id = ctx.params.id;
    const res = await commentService.update(id, ctx.request.body);
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async replyComment(ctx, next) {
    const id = ctx.params.id;
    // 获取用户参数
    const comment = ctx.request.body;

    // 数据库中创建用户
    const res = await commentService.create({ ...comment, user_id: ctx.user.id, comment_id: id });

    // 返回数据
    ctx.response.body = { code: 0, message: "success", data: res };
  }
}

module.exports = new CommentController();
