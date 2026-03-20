const userMapper = require("../database/mappers/user_mapper");

const findAll = async () => {
  let list = await userMapper.selectAllUser();
  return list;
};

module.exports = { findAll };
