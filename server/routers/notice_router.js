const express = require("express");
const router = express.Router();
const noticeService = require("../services/notice_service");
const upload = require("../upload");
const path = require("path");
const fs = require("fs");

// 공지사항 전체조회
router.get(`/notice/:institution_no`, async (req, res) => {
  const institutionNo = req.params.institution_no;
  const result = await noticeService.findAll(institutionNo);
  console.log("공지사항 result:", result, Array.isArray(result));
  return res.status(200).json(result);
});

// 첨부파일 다운로드
router.get("/notice/file/:fileNo", async (req, res) => {
  try {
    const fileNo = req.params.fileNo;
    const file = await noticeService.findFileByNo(fileNo);

    if (!file || !file.file_path) {
      return res.status(404).send("파일 정보가 없습니다.");
    }

    const absolutePath = path.join("D:/the_first/uploads", file.file_path);

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).send("파일이 존재하지 않습니다.");
    }

    const encodedName = encodeURIComponent(file.file_name.normalize("NFC"));

    res.setHeader(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodedName}`,
    );

    res.download(absolutePath, file.file_name);
  } catch (err) {
    console.log(err);
  }
});

// 공지사항 상세조회
router.get(`/notice/detail/:noticeNo`, async (req, res) => {
  try {
    const noticeNo = req.params.noticeNo;
    const result = await noticeService.findInfoByNo(noticeNo);
    res.json(result || {});
  } catch (err) {
    console.log(err);
  }
});

// 공지사항 등록
router.post(`/notice`, upload.array("files"), async (req, res) => {
  try {
    const { user_no, institution_no, notice_title, notice_content } = req.body;
    const files = req.files;

    // 필수값 체크
    if (!user_no || !institution_no || !notice_title || !notice_content) {
      return res
        .status(400)
        .json({ retCode: false, message: "필수 데이터 누락" });
    }

    const result = await noticeService.createInfo(
      {
        user_no: Number(user_no),
        institution_no: Number(institution_no),
        notice_title,
        notice_content,
      },
      files,
    );

    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

// 공지사항 수정
router.put(`/:noticeNo`, async (req, res) => {
  const noticeNo = req.params.noticeNo;
  const target = req.body;
  const result = await noticeService.modifyInfo(noticeNo, target);
  res.json(result);
});

// 공지사항 삭제
router.delete(`/notice/:noticeNo`, async (req, res) => {
  try {
    const noticeNo = req.params.noticeNo;
    await noticeService.removeNotice(noticeNo);
    res.json();
  } catch (err) {
    console.log(err);
    res.status.json();
  }
});

module.exports = router;
