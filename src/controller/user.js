const fs = require("fs");
const path = require("path");
const { omit } = require("lodash");
const userService = require("../service/user");
const fileService = require("../service/file");

class UserController {
  async createUser(ctx, next) {
    // 获取用户参数
    const user = ctx.request.body;

    // 数据库中创建用户
    const res = await userService.create(user);

    // 返回数据
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getUser(ctx, next) {
    const userId = ctx.user.id;
    const res = await userService.find("id", userId);
    ctx.response.body = { code: 0, message: "success", data: omit(res, "password") };
  }

  async getUsers(ctx, next) {
    const res = await userService.all();
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async addAvatar(ctx, next) {
    const userId = ctx.user.id;
    const file = ctx.uploadFiles[0];
    const fileId = file.file_id;
    await userService.update(userId, { avatar: fileId });
    ctx.response.body = { code: 0, message: "success", data: true };
  }

  async getAvatar(ctx, next) {
    const userId = ctx.user.id;
    const res = await userService.find("id", userId);
    const fileId = res.avatar;

    if (!fileId) {
      ctx.app.emit("error", new Error("该用户没有头像"), ctx);
      return;
    }
    const file = await fileService.get(fileId, "file_id");
    if (!file) {
      ctx.app.emit("error", new Error("该用户没有头像"), ctx);
      return;
    }
    const avatarPath = path.resolve(process.cwd(), "upload/avatar", file.name);
    try {
      // 检查文件是否存在
      await fs.promises.access(avatarPath, fs.constants.F_OK);
      // 设置响应头
      ctx.type = file.file_type; // 根据文件类型设置响应头
      ctx.response.body = fs.createReadStream(avatarPath); // 创建文件读取流
    } catch (err) {
      ctx.app.emit("error", new Error("图像没有找到"), ctx);
    }

  }
}

module.exports = new UserController();

