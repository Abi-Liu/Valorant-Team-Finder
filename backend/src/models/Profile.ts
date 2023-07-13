import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  puuid: { type: String, unique: true },
  region: { type: String },
  cardSmall: { type: String },
  cardLarge: { type: String },
  rank: { type: String },
  rankImage: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Profile", ProfileSchema);
