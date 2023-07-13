import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  matches: {
    type: [Object],
    require: true,
    default: [],
  },
});

export default mongoose.model("Match", MatchSchema);
