const { pool } = require("../DAO");

const selectAllUser = `
SELECT * FROM t_board;
`;

module.exports = { selectAllUser };
