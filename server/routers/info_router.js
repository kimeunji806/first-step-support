const express = require("express");
const router = express.Router();

const infoService = require("../services/info_service");



router.get("/managerList/:no", async (req, res) => {
  let insNo = req.params.no
  let result = await infoService.managerInfoService(insNo);
  res.send(result);
});

module.exports = router;
