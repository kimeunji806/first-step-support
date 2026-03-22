const userMapper = require("../database/mappers/user_mapper");

const findAll = async () => {
  let list = await userMapper.selectAllUser();
  return list;
};

const loginService = async (id,pw) =>{
  let login = await userMapper.loginUser(id,pw);
  return login;
}

module.exports = { findAll , loginService };
