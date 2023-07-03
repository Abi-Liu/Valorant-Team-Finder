import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  ign: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  team: { type: String, default: "" },
});

export default mongoose.model("User", UserSchema);
