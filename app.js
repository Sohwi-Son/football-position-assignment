require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// DB 연결
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 정적파일 서비스
app.use(express.static(path.join(__dirname, "public")));

// 뷰 엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 라우터 불러오기
const playerRouter = require("./routes/player");
const assignRouter = require("./routes/assign");

app.use("/", playerRouter);
app.use("/assign", assignRouter);

// 초기 화면
app.get("/", (req, res) => {
  res.render("index");
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
