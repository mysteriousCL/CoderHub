const fs = require("fs");
const path = require("path");
require("dotenv").config(); // 加载.env内容仅process.env

const { APP_PORT, SQL_HOST, SQL_PORT, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_TYPE } = process.env;

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../../keys/private.key"), { encoding: "utf-8" }); // 如果路径不转成绝对路径，那么相对路径是以process.cdw() 为基础，即启动目录。
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../../keys/public.key"), { encoding: "utf-8" });

const APP_PATH = `http://${SQL_HOST}:${APP_PORT}`;
module.exports = {
  APP_PORT,
  APP_PATH,
  SQL_HOST,
  SQL_PORT,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_TYPE,
  PRIVATE_KEY,
  PUBLIC_KEY,
};
