import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayImage: string;
  phoneNumber: string;
  isAdmin: boolean;
  isActive: boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  displayImage:{type: String},
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
