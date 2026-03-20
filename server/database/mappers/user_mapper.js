const { pool } = require("../DAO");
const userSql = require("../sql/users");

const selectAllUser = async () => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [result] = await conn.query(userSql.selectAllUser);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { selectAllUser };
