import argon2 from "argon2";

import UserModel from "../models/userSchema.js";

export const Login = async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(409).json({
      status: "error",
      message: "wrong password",
    });
  req.session.userId = user._id;

  const id = user._id;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ id, name, email, role });
};

export const checkId = async (req, res) => {
  if (!req.session.userId)
    return res.status(409).json({
      status: "error",
      message: "Please log-in again",
    });
  const user = await UserModel.findOne(
    {
      _id: req.session.userId,
    },
    "_id name email role"
  );
  if (!user)
    return res.status(404).json({ status: "error", message: "user not found" });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(409).json({
        status: "error",
        message: "Something wrong",
      });

    res.status(201).json({
      status: "success",
      message: "Logout",
    });
  });
};
