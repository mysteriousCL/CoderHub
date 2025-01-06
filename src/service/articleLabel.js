const { db } = require("../app/database");

class LabelService {
  async create(data) {
    const res = await db.insert("article_label", data);
    return res;
  }

  /**
   * 删除行数据
   * @param id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const res = await db.delete("article_label", `id = ${id}`);
    return res;
  }

  /**-
   * 检测是否已经添加过标签
   * @param articleId
   * @param labelId
   * @returns {Promise<*>}
   */
  async havItem(articleId, labelId){
    const res = await db.select(`SELECT * FROM article_label WHERE article_id = ? AND label_id = ?;`, [articleId, labelId]);
    return res[0]
  }
}

module.exports = new LabelService();
