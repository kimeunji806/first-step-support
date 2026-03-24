const { pool } = require("../DAO");
const infoSql = require("../sql/info");

const managerInfo = async (insNo) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let result = await conn.query(infoSql.mInfo, [insNo]);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {managerInfo}