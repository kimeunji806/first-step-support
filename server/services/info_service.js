const infoMapper = require("../database/mappers/info_mapper");

const managerInfoService = async (insNo) => {
  let list = await infoMapper.managerInfo(insNo);
  return list;
};



module.exports = {managerInfoService}