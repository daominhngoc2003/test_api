import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: Schema.Types.String,
      minLength: 6,
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "admin",
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);
