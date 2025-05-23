const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel");

// 선수 목록 페이지 (기존 + 용병 선수 구분)
router.get("/players", async (req, res) => {
  try {
    const existingPlayers = await Player.find({ isTemporary: false });
    const temporaryPlayers = await Player.find({ isTemporary: true });
    res.render("players", { existingPlayers, temporaryPlayers });
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
});

// 기존 선수 등록 폼
router.get("/players/existing/new", (req, res) => {
  res.render("player-form", { isTemporary: false });
});

// 용병 선수 등록 폼
router.get("/players/temporary/new", (req, res) => {
  res.render("player-form", { isTemporary: true });
});

// 기존 선수 등록 처리
router.post("/players/existing", async (req, res) => {
  try {
    const { name, position, grade } = req.body;
    await Player.create({ name, position, grade, isTemporary: false });
    res.redirect("/players");
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
});

// 용병 선수 등록 처리
router.post("/players/temporary", async (req, res) => {
  try {
    const { name, position, grade } = req.body;
    await Player.create({ name, position, grade, isTemporary: true });
    res.redirect("/players");
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
