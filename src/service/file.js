const { db } = require("../app/database");

class FileService {
  async create(files) {
    const ids = [];
    for (const file of files) {
      const res = await db.insert("file", file);
      ids.push(res.insertId);
    }
    return ids;
  }

  /**
   * 根据字段范围获取文件列表
   * @param fileIds
   * @param field
   * @returns {Promise<*>}
   */
  async range(fileIds , field = "id") {
    const ins = fileIds.map(() => '?').join(',')
    return  db.select(`SELECT * FROM file WHERE ${field} IN (${ins});`, fileIds);
  }

  async delete(id) {
    return  db.delete("file", `id = ${id}`);
  }
  async get(value, field = "id"){
    const res = await db.select(`SELECT * FROM file WHERE ${field} = (?);`, [value]);
    return res[0];
  }
}

module.exports = new FileService();
