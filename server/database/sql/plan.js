const planList = `
SELECT sp.support_plan_no as support_plan_no
        ,sp.plan_title as title
        ,sp.plan_content as content
        ,sp.plan_approval as approval
        ,cc.code_name as approval_name
        ,sp.plan_reason_rejection as rejection_reason
        ,GROUP_CONCAT(f.file_name ORDER BY f.file_no SEPARATOR ', ') as filename
        ,u.user_name as name
        ,DATE_FORMAT(sp.created_at, '%Y-%m-%d') as created_at
FROM support_plan sp
JOIN user u
    ON sp.writer_no = u.user_no
LEFT JOIN files f
    ON f.support_plan_no = sp.support_plan_no
LEFT JOIN common_code cc
    ON sp.plan_approval = cc.common_id
WHERE sp.survey_no = ?
GROUP BY sp.support_plan_no
        ,sp.plan_title
        ,sp.plan_content
        ,sp.plan_approval
        ,cc.code_name
        ,sp.plan_reason_rejection
        ,u.user_name
        ,sp.created_at
`;

const findBeneficiaryNoBySurvey = `
SELECT beneficiaries_no
FROM survey_input
WHERE survey_no = ?
`;

const insertPlan = `
INSERT INTO support_plan (
    survey_no,
    beneficiaries_no,
    plan_title,
    plan_content,
    writer_no,
    plan_approval,
    created_at
) VALUES (?, ?, ?, ?, ?, 'a0', NOW())
`;

module.exports = {
  planList,
  findBeneficiaryNoBySurvey,
  insertPlan,
};
