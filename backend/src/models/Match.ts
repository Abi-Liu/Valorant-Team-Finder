import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  playerTeam: {
    type: String,
  },
  playerStats: {
    type: Object,
  },
  adr: {
    type: Number,
  },
  character: {
    type: String,
  },
  redWon: {
    type: Object,
  },
  blueWon: {
    type: Object,
  },
  // redPlayers: {
  //   type: [Object],
  // },
  // bluePlayers: {
  //   type: [Object],
  // },
});

const MatchArraySchema = new mongoose.Schema({
  matches: [MatchSchema], // Array of MatchSchema
});

export default mongoose.model("MatchArray", MatchArraySchema);
