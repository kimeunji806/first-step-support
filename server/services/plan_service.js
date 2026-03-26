const dao = require("../database/DAO");
const sql = require("../database/sql/plan");

const getPlanList = async (surveyNo) => {
  let conn;
  try {
    conn = await dao.pool.getConnection();
    const rows = await conn.query(sql.planList, [surveyNo]);
    return rows ?? [];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

const addPlan = async ({ survey_no, plan_title, plan_content, writer_no }) => {
  let conn;
  try {
    conn = await dao.pool.getConnection();

    const surveyRows = await conn.query(sql.findBeneficiaryNoBySurvey, [
      survey_no,
    ]);

    if (!surveyRows.length) {
      throw new Error("해당 조사지 정보를 찾을 수 없습니다.");
    }

    const beneficiaries_no = surveyRows[0].beneficiaries_no;

    const result = await conn.query(sql.insertPlan, [
      survey_no,
      beneficiaries_no,
      plan_title,
      plan_content,
      writer_no,
    ]);

    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  getPlanList,
  addPlan,
};
