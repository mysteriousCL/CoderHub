const fileService = require("../service/file");
const path = require("path");
const fs = require("fs");
const sharp = require('sharp'); // 引入sharp库，用来处理图片

async function resizeImage(filePath, width, height) {
  return sharp(filePath)
    .resize(width, height) // 设置目标宽高
    .toBuffer(); // 返回处理后的图片缓冲区
}
async function sendFile(ctx, next) {
  const fileId = ctx.params.id;
  const file = await fileService.get(fileId, "file_id");
  if (!file) {
    ctx.app.emit("error", new Error("没有该文件"), ctx);
    return;
  }
  const filePath = path.resolve(process.cwd(), file.path, file.name);
  const size = ctx.query.size;
  try {
    // 检查文件是否存在
    await fs.promises.access(filePath, fs.constants.F_OK);
    // 设置响应头
    ctx.type = file.file_type; // 根据文件类型设置响应头
    if(size){
      const [width, height] = size.split('x').map(Number); // 解析宽高
      // 处理图片缩放
      ctx.response.body = await resizeImage(filePath, width, height);
    }else{
      ctx.response.body = fs.createReadStream(filePath); // 创建文件读取流
    }

  } catch (err) {
    ctx.app.emit("error", new Error("文件没有找到"), ctx);
  }
}

module.exports = {
  sendFile
}
