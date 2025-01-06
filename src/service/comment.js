const { db } = require("../app/database");
const { APP_PATH} = require("../app/config")
class CommentService {
  async create(data) {
    const res = await db.insert("comment", data);
    return res;
  }

  /**
   * 查找用户
   * @param field 根据什么字段来查找
   * @param value 字段到值
   * @returns {Promise<void>}
   */
  async find(field, value) {
    const res = await db.select(`SELECT * FROM comment WHERE ${field} = ?`, [value]);
    return res[0];
  }

  /**
   * 删除行数据
   * @param id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const res = await db.delete("comment", `id = ${id}`);
    return res;
  }

  async update(id, data) {
    const res = await db.update("comment", data, `id = ${id}`);
    return res;
  }

  async all(page) {
    const { offset, limit } = page;
    const statement = `
    SELECT
      m.id id,
      m.content content,
      JSON_OBJECT('name', u.name, 'id', u.id, 'avatar', CONCAT('${APP_PATH}/file/',u.avatar)) as user,
      m.createTime createTime,
      m.updateTime createTime
    FROM comment m LEFT JOIN users u ON m.user_id=u.id LIMIT ?, ?;`;
    const res = await db.select(statement, [offset, limit]);
    return res;
  }
}

module.exports = new CommentService();
