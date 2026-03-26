const { pool } = require("../DAO");
const surveySql = require("../sql/survey");

const main = async (mainNo) => {
  console.log(mainNo);

  let conn = null;
  try {
    conn = await pool.getConnection();
    let result = await conn.query(surveySql.main, [mainNo]);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

const sub = async (subNo) => {
  console.log(subNo);

  let conn = null;
  try {
    conn = await pool.getConnection();
    let result = await conn.query(surveySql.sub, [subNo]);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

const question = async (questionNo) => {
  console.log(questionNo);

  let conn = null;
  try {
    conn = await pool.getConnection();
    let result = await conn.query(surveySql.question, [questionNo]);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { main, sub, question };
