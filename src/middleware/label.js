/**
 * 效验评论是否合法
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function verifyLabel(ctx, next) {
  const { name } = ctx.request.body;
  let error = "";
  if (!name) {
    error = "请提供标签名称";
  }
  if (error) return ctx.app.emit("error", new Error(error), ctx);
  await next();
}

module.exports = {
  verifyLabel,
};
