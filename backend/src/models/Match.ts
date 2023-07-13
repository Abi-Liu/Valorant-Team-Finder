import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  redPlayers: {
    type: [Object],
  },
  bluePlayers: {
    type: [Object],
  },
  redWon: {
    type: Object,
  },
  blueWon: {
    type: Object,
  },
});

export default mongoose.model("Match", MatchSchema);
