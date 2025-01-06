const { db } = require("../app/database");

class AuthService {
  check(tableName, params, option = { id: "id", userId: "user_id" }) {
    const statement = `SELECT * FROM ${tableName} WHERE ${option.id} = ? AND ${option.userId}  = ?;`;
    return db.select(statement, [params[option.id], params[option.userId]]);
  }
}

module.exports = new AuthService();
