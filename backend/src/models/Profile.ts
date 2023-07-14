import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  puuid: { type: String, unique: true },
  region: { type: String, enum: ["na", "br", "eu", "ap", "kr", "latam"] },
  cardSmall: { type: String },
  cardLarge: { type: String },
  rank: { type: String },
  rankImage: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Profile", ProfileSchema);
