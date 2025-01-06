const { db } = require("../app/database");
const {APP_PATH} = require("../app/config")

class UserService {
  async create(user) {
    const res = await db.insert("users", user);
    return res;
  }

  /**
   * 查找用户
   * @param field 根据什么字段来查找
   * @param value 字段到值
   * @returns {Promise<void>}
   */
  async find(field, value) {
    APP_PATH
    const statement = `
    SELECT
      id,
      name,
      age,
      phone,
      CONCAT('${APP_PATH}/file/',avatar) avatar
    FROM users WHERE ${field} = ?;
    `
    const res = await db.select(statement, [value]);
    return res[0];
  }

  async all() {
    const res = await db.select(`SELECT id,name,age,phone,createTime,updateTime FROM users;`, []);
    return res;
  }

  async update(id,data){
    const res = await db.update("users", data, `id = ${id}`)
    return res
  }
}

module.exports = new UserService();
