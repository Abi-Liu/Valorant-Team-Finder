import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  puuid: { type: String, unique: true },
  region: { type: String, enum: ["na", "br", "eu", "ap", "kr", "latam"] },
  cardSmall: { type: String },
  cardLarge: { type: String },
  rank: { type: String },
  rankImage: { type: String },
  //used to let my server know when the data is stale and to refresh and update the document.
  //once every 6 hours
  expiryTime: {
    type: Date,
    default: () => {
      const currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 6);
      return currentTime;
    },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Profile", ProfileSchema);
