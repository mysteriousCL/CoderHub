const mysql = require("mysql2/promise");
const config = require("./config");
// 创建连接池
const pool = mysql.createPool({
  host: config.SQL_HOST,
  user: config.SQL_USER,
  password: config.SQL_PASSWORD,
  database: config.SQL_DATABASE,
  // 连接池配置
  connectionLimit: 10, // 最大连接数，即最大创建个数
  waitForConnections: true, // 是否等待连接
  queueLimit: 0, // 队列限制
  maxIdle: 10, // 最大空闲连接数
  idleTimeout: 60000, // 空闲超时时间
  enableKeepAlive: true, // 保持连接活跃
  keepAliveInitialDelay: 0, // 保持连接初始延迟
});

const db = {
  // 查询
  async select(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  },

  // 插入
  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`;
    const [result] = await pool.execute(sql, values);
    return result;
  },

  // 更新
  async update(table, data, where) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const sql = `UPDATE ${table} SET ${keys.map((key) => `${key} = ?`).join(",")} WHERE ${where}`;
    const [result] = await pool.execute(sql, values);
    return result;
  },

  // 删除
  async delete(table, where) {
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    console.log("测试：",sql);
    const [result] = await pool.execute(sql);
    return result;
  },
};

async function testConnect() {
  const connection = await pool.getConnection();
  const res = await connection.connect();
  console.log(res);
  connection.release();
}

module.exports = {
  db,
  pool,
};
