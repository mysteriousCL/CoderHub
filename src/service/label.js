const { db } = require("../app/database");

class LabelService {
  async create(data) {
    const res = await db.insert("label", data);
    return res;
  }

  async havLabel(name) {
    const res = await db.select(`SELECT name FROM label WHERE name = ?`, [name]);
    return res[0];
  }

  /**
   * 删除行数据
   * @param id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const res = await db.delete("label", `id = ${id}`);
    return res;
  }

  async all(page) {
    const { offset, limit } = page;
    const statement = `
    SELECT
      l.id id,
      l.name name,
      JSON_OBJECT('name', u.name, 'id', u.id, 'phone', u.phone) as user,
      l.createTime createTime,
      l.updateTime updateTime
    FROM label l
    LEFT JOIN users u ON l.user_id=u.id
    LIMIT ?, ?;
`;
    const res = await db.select(statement, [offset, limit]);
    return res;
  }

  async allLabels() {
    const res = await db.select(`SELECT * FROM label;`, []);
    return res;
  }
}

module.exports = new LabelService();
