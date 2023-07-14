import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
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

  //used to let my server know when the data is stale and to refresh and update the document.
  //once an hour
  expiryTime: {
    type: Date,
    default: () => {
      const currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 1);
      return currentTime;
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("MatchArray", MatchArraySchema);
