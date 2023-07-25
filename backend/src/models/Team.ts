import mongoose from "mongoose";
const TeammateSchema = new mongoose.Schema({
  userId: { type: String },
  ign: { type: String },
});
const TeamSchema = new mongoose.Schema({
  teammates: {
    type: [TeammateSchema],
  },
  name: {
    type: String,
    require: true,
    default: "",
  },
});

export default mongoose.model("Team", TeamSchema);
