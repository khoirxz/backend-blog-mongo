import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";

import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
dotenv.config();

app.use(
  session({
    secret: process.env.SECRECT_KEY,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_URL,
    }),
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  express.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("API DADAR");
  res.end();
});
app.use("/api", blogRouter);
app.use("/api", userRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:5000/");
    });
  })
  .catch((err) => {
    console.log(err);
  });
