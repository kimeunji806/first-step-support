const dao = require("../database/DAO");
const sql = require("../database/sql/sysadmin_institution");

// 기관 전체 목록 조회
const getInstitutionList = async () => {
  let conn;
  try {
    conn = await dao.pool.getConnection();
    const rows = await conn.query(sql.selectInstitutionList);
    return rows ?? [];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  getInstitutionList,
};
