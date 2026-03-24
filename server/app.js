require("dotenv").config({ path: "./database/dbConfig.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("./nodemailer");
app.use(cors());
const port = 3000;
const codeStore = require("./codeStore");
// 미들웨어 등록 영역
// body parser
// content-type : application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// content-type : application/json
app.use(express.json());

// Server 실행
app.listen(port, () => {
  console.log("Server Start");
  console.log(`http://localhost:${port}`);
});

// 라우팅 등록 영역
// - 기본 라우팅
app.get("/", (req, res) => {
  res.send("Welcome!!");
});

app.post("/mail", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const result = await nodemailer.sendEmail(email);

  if (result.messageId) {
    res.json({ retCode: "OK" });
  } else {
    res.json({ retCode: "NG" });
  }

  // res.json(result);
  // res.send("<p>메일발송성공</p>");
});

app.post("/verify", (req, res) => {
  const { user_email, code } = req.body;
  try {
    const data = codeStore.get(user_email);
    console.log(data.code);
    console.log(code);

    if (!data) throw new Error("요청없음");

    if (Date.now() > data.expiresAt) {
      codeStore.delete(user_email);
      throw new Error("만료됨");
    }

    if (data.code !== code) {
      throw new Error("틀림");
    }
    res.json({ retCode: true });

    codeStore.delete(user_email);
  } catch (err) {}
});

// 기능별 라우터 모듈 등록
const userRouter = require("./routers/user_router.js");
app.use("/", userRouter);
const institutionRouter = require("./routers/institution_router.js");
app.use("/", institutionRouter);
