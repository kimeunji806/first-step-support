const express = require("express");
const router = express.Router();
const service = require("../services/plan_service");

// 지원계획 조회
router.get("/:surveyNo", async (req, res) => {
  try {
    const { surveyNo } = req.params;
    const list = await service.getPlanList(surveyNo);
    return res.json(list ?? []);
  } catch (err) {
    console.error("지원계획 조회 실패:", err);
    return res.status(500).json({
      message: "지원계획 조회 중 오류가 발생했습니다.",
    });
  }
});

// 지원계획 등록
router.post("/", async (req, res) => {
  try {
    const { survey_no, plan_title, plan_content, writer_no } = req.body;

    if (!survey_no || !plan_title || !plan_content || !writer_no) {
      return res.status(400).json({
        message: "필수값이 누락되었습니다.",
      });
    }

    const result = await service.addPlan({
      survey_no,
      plan_title,
      plan_content,
      writer_no,
    });

    return res.status(201).json({
      message: "지원계획이 등록되었습니다.",
      result,
    });
  } catch (err) {
    console.error("지원계획 등록 실패:", err);
    return res.status(500).json({
      message: err.message || "지원계획 등록 중 오류가 발생했습니다.",
    });
  }
});

module.exports = router;
