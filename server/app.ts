import express from "express";
import mongoose from "mongoose";
import { BirdModel } from "./db";
import { birdsRoutes } from "./api";

async function run() {
  const app = express();
  await mongoose.connect("mongodb://localhost:27017/stoop");

  // const b = new BirdModel({
  //   name: "a",
  //   entries: [{ dateTime: new Date(), weight: 5 }],
  //   target: { dateTime: new Date(), weight: 6 },
  // });
  // b.save();
  // process.exit();

  app.use("/api", birdsRoutes);

  app.listen(8001, () => {
    console.log("Listening on port 8001");
  });
}

try {
  run();
} catch (err) {
  console.log(err);
}
