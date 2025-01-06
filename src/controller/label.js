const LabelService = require("../service/label");

class LabelController {
  async createLabel(ctx, next) {
    // 获取用户参数
    const data = ctx.request.body;

    // 数据库中创建用户
    const res = await LabelService.create({ ...data, user_id: ctx.user.id });

    // 返回数据
    ctx.response.body = { code: 0, message: "success", data: res };
  }
  async getLabels(ctx, next) {
    const { limit, offset } = ctx.request.query;
    const res = await LabelService.all({ limit: limit || "20", offset: offset || "0" });
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async deleteLabel(ctx, next) {
    const id = ctx.params.id;
    const res = await LabelService.delete(id);
    ctx.response.body = { code: 0, message: "success", data: res };
  }
}

module.exports = new LabelController();
