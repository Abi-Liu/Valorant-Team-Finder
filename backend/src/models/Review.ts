import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
  rating: { type: Number },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
});

export default mongoose.model("Review", ReviewSchema);
