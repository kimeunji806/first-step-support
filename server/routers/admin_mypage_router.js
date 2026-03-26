const express = require("express");
const router = express.Router();
const service = require("../services/admin_mypage_service");

// 기관관리자 본인정보 조회
router.get("/:userNo", async (req, res) => {
  try {
    const { userNo } = req.params;
    const data = await service.getAdminMyPage(userNo);

    if (data) {
      res.json({
        retCode: "OK",
        data,
      });
    } else {
      res.json({
        retCode: "FAIL",
        message: "조회된 정보가 없습니다.",
      });
    }
  } catch (err) {
    console.error("기관관리자 본인정보 조회 오류:", err);
    res.status(500).json({
      retCode: "FAIL",
      message: "기관관리자 본인정보 조회 실패",
    });
  }
});

// 기관관리자 본인정보 수정
router.put("/:userNo", async (req, res) => {
  try {
    const { userNo } = req.params;
    const { user_name, tel, email, address } = req.body;

    const result = await service.modifyAdminMyPage({
      user_no: userNo,
      user_name,
      tel,
      email,
      address,
    });

    if (result.affectedRows > 0) {
      res.json({
        retCode: "OK",
        message: "수정 완료",
      });
    } else {
      res.json({
        retCode: "FAIL",
        message: "수정된 정보가 없습니다.",
      });
    }
  } catch (err) {
    console.error("기관관리자 본인정보 수정 오류:", err);
    res.status(500).json({
      retCode: "FAIL",
      message: "기관관리자 본인정보 수정 실패",
    });
  }
});

module.exports = router;
