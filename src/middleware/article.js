const labelService = require("../service/label");

/**
 * 效验评论是否合法
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function verifyArticle(ctx, next) {
  const { content } = ctx.request.body;
  let error = "";
  if (!content) {
    error = "请提供内容";
  }
  if (error) return ctx.app.emit("error", new Error(error), ctx);
  await next();
}

async function verifyArticleLabel(ctx, next) {
  const { content } = ctx.request.body;
  let error = "";
  if (!content) {
    error = "请提供标签内容";
  }
  if (error) return ctx.app.emit("error", new Error(error), ctx);
  ctx.request.body.content = Array.isArray(content) ? content : [content];
  await next();
}

/**
 * 根据标签名，判断是否存在标签表中。如果不存在，就插入表中。
 * 给ctx.labels添加查询及创建后的结果
 */
async function verifyLabelExisted(ctx, next) {
  const articleId = ctx.params.id;
  const user_id = ctx.user.id;
  const { content } = ctx.request.body;
  // 要附加的标签列表
  const labels = [];

  // 1. 如果标签长度小于3，使用逐个数据库检测
  // 2. 否则获取所有标签，以此为依据进行过滤
  if (content.length > 2) {
    const list = await labelService.allLabels();
    const labelMap = list.reduce((acc, cur) => {
      acc[cur.name] = cur;
      return acc;
    }, {});
    for (const label of content) {
      if (labelMap[label]) {
        labels.push({ label_id: labelMap[label].id, article_id: articleId });
      } else {
        await addNewLabel(label);
      }
    }
  } else {
    for (const label of content) {
      const item = await labelService.havLabel(label);
      if (item) {
        labels.push({ label_id: item.id, article_id: articleId });
      } else {
        await addNewLabel(label);
      }
    }
  }

  // 将新标签插入标签表，获取标签id，然后与文章id添加进relationshipList
  async function addNewLabel(label) {
    const res = await labelService.create({ user_id, name: label });
    const labelId = res.insertId;
    labels.push({ label_id: labelId, article_id: articleId });
  }

  ctx.labels = labels;
  await next();
}

module.exports = {
  verifyArticle,
  verifyArticleLabel,
  verifyLabelExisted,
};
