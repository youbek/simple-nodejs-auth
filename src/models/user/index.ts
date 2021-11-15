import { model, Schema } from "mongoose";

export type IUserSchema = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export const User = new Schema({
  name: String,
  email: String,
  password: String,
});

export const UserModel = model("User", User);
