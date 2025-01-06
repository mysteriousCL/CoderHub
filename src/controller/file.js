const FileService = require("../service/file");

class fileController {
  async getFile(ctx, next) {
    const fileId = ctx.params.id;
   const res = await FileService.get(fileId, "file_id")
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async getFiles(ctx, next){
    const res = await FileService.range(ctx.uploadFileIds)
    ctx.response.body = { code: 0, message: "success", data: res };
  }

  async deleteFile(ctx, next) {
    const fileId = ctx.params.id;
    await FileService.delete(fileId);
    ctx.response.body = { code: 0, message: "success", data: true };
  }
}

module.exports = new fileController();
