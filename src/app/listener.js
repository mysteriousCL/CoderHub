const errorTypes = require("./constant");

/**
 * 处理app上接受到到错误
 * @param error
 * @param ctx
 */
function handleAppError(error, ctx) {
  console.log(error);
  let status = 404,
    code = -1,
    message = "NOT FOUND";
  switch (error.message) {
    case errorTypes.TOKEN_INVALID:
      status = 401;
      message = "token无效";
      break;
    case errorTypes.TOKEN_EXPIRED:
      status = 401;
      message = "token过期";
      break;
    case errorTypes.TOKEN_NOT_BEFORE:
      status = 401;
      message = "token为生成";
      break;
    case errorTypes.REQUIRE_USER_NAME:
      status = 400;
      message = "用户姓名为空";
      break;
    case errorTypes.REQUIRE_USER_PHONE:
      status = 400;
      message = "用户手机号为空";
      break;
    case errorTypes.EXIST_USER_PHONE:
      status = 200;
      message = "手机号已存在";
      break;
    case errorTypes.REQUIRE_USER_PASSWORD:
      status = 409;
      message = "用户密码为空";
      break;
    case errorTypes.NO_USER_EXIST:
      status = 200;
      message = "没有该用户";
      break;
    case errorTypes.USER_PASSWORD_ERROR:
      status = 200;
      message = "用户密码不正确";
      break;
    case errorTypes.NOT_OPERATE_RIGHT:
      status = 200;
      message = "没有操作权限";
      break;
  }
  ctx.status = status;
  ctx.response.body = { code: code, message: message, data: null };
}

function setupAppListener(app) {
  app.on("error", handleAppError);
}

module.exports = {
  setupAppListener,
};
