const errorTypes = require("../app/constant");
const userController = require("../service/user");
const { encryptContentToHex } = require("../utils/encrypt");

/**
 * 效验用户名是否合法，传递的数据是否完整等
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function verifyUser(ctx, next) {
  const { name, phone, password } = ctx.request.body;
  let error = "";
  switch (true) {
    case !name:
      error = errorTypes.REQUIRE_USER_NAME;
      break;
    case !phone:
      error = errorTypes.REQUIRE_USER_PHONE;
      break;
    case !password:
      error = errorTypes.REQUIRE_USER_PASSWORD;
  }
  if (!error) {
    const user = await userController.find("phone", phone);
    if (user) {
      error = errorTypes.EXIST_USER_PHONE;
    }
  }
  if (error) return ctx.app.emit("error", new Error(error), ctx);
  await next();
}

/**
 * 登录时判断是否填写手机号和密码
 * @param ctx
 * @param next
 * @returns {Promise<*>}
 */
async function verifyLogin(ctx, next) {
  // 检测用户和密码是否存在
  const { phone, password } = ctx.request.body;
  let error = "";
  switch (true) {
    case !phone:
      error = errorTypes.REQUIRE_USER_PHONE;
      break;
    case !password:
      error = errorTypes.REQUIRE_USER_PASSWORD;
  }
  let user;
  // 检测用户是否存在
  if (!error) {
    user = await userController.find("phone", phone);

    if (user) {
      // 效验用户密码是否正确
      if (encryptContentToHex(password) !== user.password) {
        error = errorTypes.USER_PASSWORD_ERROR;
      }
    } else {
      error = errorTypes.NO_USER_EXIST;
    }
  }
  if (error) return ctx.app.emit("error", new Error(error), ctx);
  ctx.user = user;
  await next();
}

async function encryptUserPassword(ctx, next) {
  const { password } = ctx.request.body;
  ctx.request.body.password = encryptContentToHex(password);
  await next();
}

module.exports = {
  verifyUser,
  verifyLogin,
  encryptUserPassword,
};
