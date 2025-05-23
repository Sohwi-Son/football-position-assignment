const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: {
    type: String,
    enum: ["ST", "W", "MF", "FB", "CB"],
    required: true,
  },
  grade: { type: String, enum: ["S", "A", "B", "C"], required: true },
  appearances: { type: Number, default: 0 },
  isTemporary: { type: Boolean, default: false }, // 용병 여부
});

module.exports = mongoose.model("Player", playerSchema);
