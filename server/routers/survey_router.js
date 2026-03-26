const express = require("express");
const router = express.Router();

const surveyService = require("../services/survey_service");

router.get("/main", async (req, res) => {
  let mainNo = req.params.no;
  console.log(mainNo);
  let result = await surveyService.mainInfoService(mainNo);
  console.log(result);
  res.send(result);
});

router.get("/sub/:no", async (req, res) => {
  let subNo = req.params.no;
  console.log(subNo);
  let result = await surveyService.subInfoService(subNo);
  console.log(result);
  res.send(result);
});

router.get("/question/:no", async (req, res) => {
  let questionNo = req.params.no;
  console.log(questionNo);
  let result = await surveyService.questionInfoService(questionNo);
  console.log(result);
  res.send(result);
});

module.exports = router;
