const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel");

// 쿼터 선택 화면
router.get("/", (req, res) => {
  res.render("assign-form");
});

// 참석 선수 선택 화면
router.get("/select/:quarter", async (req, res) => {
  const quarter = req.params.quarter;
  try {
    const existingPlayers = await Player.find({ isTemporary: false });
    const temporaryPlayers = await Player.find({ isTemporary: true });
    res.render("assign-select", { quarter, existingPlayers, temporaryPlayers });
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
});

// 참석 선수 선택 후 포지션 배치 결과 페이지 (임시, 실제 로직은 별도 구현 필요)
router.post("/select/:quarter/confirm", async (req, res) => {
  const quarter = req.params.quarter;
  let selectedPlayerIds = req.body.selectedPlayers;
  if (!selectedPlayerIds) {
    return res.status(400).send("선수를 최소 1명 선택하세요.");
  }
  if (!Array.isArray(selectedPlayerIds)) {
    selectedPlayerIds = [selectedPlayerIds];
  }

  try {
    const players = await Player.find({ _id: { $in: selectedPlayerIds } });
    // TODO: 포지션 배치 알고리즘 구현
    res.render("assign-result", { quarter, assignedPlayers: players });
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
