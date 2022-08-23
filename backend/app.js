const express = require("express");
const userRouter = require("./userRoutes");
const placeRouter = require("./placeRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii i am server");
});

app.use("/api/users/v1/", userRouter);
app.use("/api/places/v1/", placeRouter);

app.use((req, res, next) => {
  res.status(400).json({
    message: "Invalid route",
  });
});

module.exports = app;
