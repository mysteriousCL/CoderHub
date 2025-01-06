const { db } = require("../app/database");
const {APP_PATH} = require("../app/config")

class ArticleService {
  async create(data) {
    const res = await db.insert("article", data);
    return res;
  }

  /**
   * 查找文章
   * @param articleId 文章id
   * @returns {Promise<void>}
   */
  async find(articleId) {
    const statement = `
SELECT
      m.id id,
      m.content content,
      JSON_OBJECT('name', u.name, 'id', u.id, 'phone', u.phone, 'avatar', CONCAT('${APP_PATH}/file/',u.avatar)) as user,
      m.createTime createTime,
      m.updateTime updateTime,
      IF(COUNT(l.id),JSON_ARRAYAGG(l.name),NULL) labels,
      (
        SELECT
        IF(COUNT(c.id),JSON_ARRAYAGG(JSON_OBJECT(
                  'id', c.id,
                  'content',c.content,
                  'pid', c.comment_id,
                  'user', JSON_OBJECT('id', c.user_id, 'name', cu.name, 'avatar', CONCAT('${APP_PATH}/file/',cu.avatar))
                )),NULL)
        FROM comment c
        LEFT JOIN users cu ON c.user_id=cu.id
        WHERE m.id = c.article_id
      ) as coments
    FROM article m
    LEFT JOIN users u ON m.user_id=u.id
    LEFT JOIN article_label al ON m.id=al.article_id
    LEFT JOIN label l ON al.label_id=l.id
    GROUP BY m.id
    HAVING m.id = ?;
\t
    `;
    const res = await db.select(statement, [articleId]);
    return res[0];
  }

  /**
   * 删除行数据
   * @param id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const res = await db.delete("article", `id = ${id}`);
    return res;
  }

  async update(id, data) {
    const res = await db.update("article", data, `id = ${id}`);
    return res;
  }

  async all(page) {
    const { offset, limit } = page;
    const statement = `
    SELECT
      m.id id,
      m.content content,
      JSON_OBJECT('name', u.name, 'id', u.id, 'phone', u.phone) as user,
      m.createTime createTime,
      m.updateTime updateTime,
      (SELECT COUNT(*) from comment c WHERE c.article_id=m.id) momentCount,
      (SELECT COUNT(*) from article_label al WHERE al.article_id=m.id) labelCount
    FROM article m
    LEFT JOIN users u ON m.user_id=u.id
    LEFT JOIN comment c ON m.id=c.article_id
    LIMIT ?, ?;
`;
    const res = await db.select(statement, [offset, limit]);
    return res;
  }

  /**
   * 获取文章评论列表
   */
  async moments(articleId) {
    const statement = `
      SELECT
          c.id,c.content, c.comment_id pid, c.createTime createAt,
          JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.article_id = ?;
    `;
    const res = await db.select(statement, [articleId]);
    return res;
  }
}

module.exports = new ArticleService();
