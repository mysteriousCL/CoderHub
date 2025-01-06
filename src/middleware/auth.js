const { createToken, verifyToken } = require("../utils/jwt");
const { NOT_OPERATE_RIGHT } = require("../app/constant");
const authService = require("../service/auth");

async function createAuthCertificate(ctx, next) {
  const user = ctx.user;
  ctx.response.body = {
    code: 0,
    message: "success",
    data: {
      token: createToken({
        id: user.id,
        name: user.name,
      }),
    },
  };
  await next();
}

async function verifyAuthCertificate(ctx, next) {
  const bearer = ctx.request.header.authorization || "";
  const token = bearer.replace(/^Bearer /, "");
  const { data, error } = verifyToken(token);
  if (error) return ctx.app.emit("error", new Error(error), ctx);

  ctx.user = {
    id: data.id,
    name: data.name,
  };
  await next();
}

/**
 * 删除获取修改时，检测数据是否为该用户的数据
 * @returns {Promise<void>}
 */
function checkUpdatePermission(tableName) {
  return async (ctx, next) => {
    const userId = ctx.user.id;
    const id = ctx.params.id;
    const res = await authService.check(tableName, { id: +id, user_id: userId });
    const hasPermission = res.length > 0;
    if (hasPermission) {
      await next();
    } else {
      return ctx.app.emit("error", new Error(NOT_OPERATE_RIGHT), ctx);
    }
  };
}

module.exports = {
  createAuthCertificate,
  verifyAuthCertificate,
  checkUpdatePermission,
};
