import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const UserModel = mongoose.model("userSchema", userSchema);

export default UserModel;
