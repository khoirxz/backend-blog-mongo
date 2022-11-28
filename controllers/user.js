import mongoose from "mongoose";
import argon2 from "argon2";

import UserModel from "../models/userSchema.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(201).json(users);
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await UserModel.findById(_id);

    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const postUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    return res.status(409).json({
      status: "error",
      message: "password doesn't macth",
    });
  const hashedPassword = await argon2.hash(password);

  const newData = new UserModel({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });
  try {
    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const { name, email, password, confirmPassword, role } = req.body;
  let hashedPassword;

  const user = await UserModel.findById(_id);
  if (!user)
    return res.status(409).json({
      status: "error",
      message: "user not found",
    });

  if (password !== confirmPassword)
    return res.status(409).json({
      status: "error",
      message: "password doesn't macth",
    });

  if (password === undefined || password === "" || password === null) {
    hashedPassword = user.password;
    // console.log("password tidak ganti");
  } else {
    hashedPassword = await argon2.hash(password);
    // console.log("password ganti");
  }

  const updatedData = {
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  };

  try {
    const updateData = await UserModel.findByIdAndUpdate(
      _id,
      {
        ...updatedData,
        id: _id,
      },
      {
        new: true,
      }
    );

    res.status(201).json(updateData);
  } catch (error) {
    res.status(409).json({
      error: "error",
      message: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "error",
      message: "user not found",
    });
  }

  try {
    await UserModel.findByIdAndRemove(id);
    res.status(201).json({
      status: "success",
      message: "post deleted",
    });
  } catch (error) {
    res.status(409).json({
      error: "error",
      message: "post not found",
    });
  }
};
