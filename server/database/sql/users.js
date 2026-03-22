const { pool } = require("../DAO");

const selectAllUser = `
SELECT * FROM t_board;
`;


const loginUser = `
SELECT user_no,
        role,
        user_id,
        user_name,
        approval
FROM user
WHERE user_id = ? AND user_pw = ?
`

module.exports = { selectAllUser ,loginUser };
