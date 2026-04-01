const express = require("express");
const router = express.Router();
const service = require("../services/sysadmin_institution_service");

// 기관 전체 목록 조회
router.get("/", async (req, res) => {
  try {
    const list = await service.getInstitutionList();
    res.json({
      retCode: "OK",
      data: list,
    });
  } catch (err) {
    console.error("시스템관리자 기관 목록 조회 오류:", err);
    res.status(500).json({
      retCode: "FAIL",
      message: "기관 목록 조회 실패",
    });
  }
});

module.exports = router;
