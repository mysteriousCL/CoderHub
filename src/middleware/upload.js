const multer = require("@koa/multer");
const path = require("path");
const fs = require("fs");
const fileService = require("../service/file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const url = req.url;
    let dir = "upload/";
    switch (true) {
      case url.endsWith("/avatar"):
        dir += "avatar";
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const { mimetype, originalname } = file;
    const fileExtName = path.extname(originalname);
    const fileName = `${Date.now()}_${Math.round(Math.random() * 1e9)}${fileExtName}`;

    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

async function addFileToSql(ctx, next) {
  const user_id = ctx.user.id;

  const files = ctx.request.file ? [ctx.request.file] : ctx.request.files || [];

  const list = [];
  for (const file of files) {
    const { originalname, mimetype, destination, filename, size } = file;
    const [file_id] = filename.split("."); // file_id为随机化的文件名称
    const baseDir = path.basename(destination); // 获取最后一级目录
    const item = {
      user_id,
      file_id,
      name: filename,
      file_name: originalname,
      file_type: mimetype,
      file_size: size,
      path: destination,
      type: baseDir === "upload" ? null : baseDir,
    };
    list.push(item);
  }

  const fileIds = await fileService.create(list);
  ctx.uploadFiles = list;
  ctx.uploadFileIds = fileIds;
  await next();
}

module.exports = {
  upload,
  addFileToSql,
};
