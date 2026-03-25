const { pool } = require("../DAO");

const list = `
SELECT b.beneficiaries_name as beneficiaries_name
        ,g.user_name as guardian_name
        ,DATE_FORMAT(s.created_at, '%Y-%m-%d') as created_at
        ,p.priority_id as priority_id
        ,g.user_no as gurdian_no
FROM survey_input s
JOIN user u ON s.manager_no = u.user_no
JOIN beneficiaries b ON b.beneficiaries_no = s.beneficiaries_no
LEFT JOIN user g 
    ON b.guardian_no = g.user_no
LEFT JOIN priority p ON s.survey_no = p.survey_no
WHERE s.manager_no = ?;
`;

module.exports = { list };
