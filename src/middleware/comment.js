/**
 * 效验评论是否合法
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function verifyComment(ctx, next) {
  const { content } = ctx.request.body;
  let error = "";
  if (!content) {
    error = "请提供内容";
  }
  if (error) return ctx.app.emit("error", new Error(error), ctx);
  await next();
}

module.exports = {
  verifyComment,
};
