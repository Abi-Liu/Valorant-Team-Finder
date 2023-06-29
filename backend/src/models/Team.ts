import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  teammates: {
    type: [String],
  },
  name: {
    type: String,
    require: true,
    default: "",
  },
});

export default mongoose.model("Team", TeamSchema);
