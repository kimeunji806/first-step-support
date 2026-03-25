const listMapper = require("../database/mappers/list_mapper");

const listInfoService = async (userNo) => {
  console.log(userNo)

  let list = await listMapper.list(userNo);
  return list;
};

module.exports = { listInfoService };
