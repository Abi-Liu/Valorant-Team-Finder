import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  ign: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("User", UserSchema);
