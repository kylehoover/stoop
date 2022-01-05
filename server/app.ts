import express from "express";
import mongoose from "mongoose";
import { BirdModel } from "./db";

async function run() {
  const app = express();
  await mongoose.connect("mongodb://localhost:27017/stoop");

  // const b = new BirdModel({ name: "Bird1", entries: [{ dateTime: new Date(), weight: 5 }] });
  // b.save();

  const birds = await BirdModel.find();
  console.log(JSON.stringify(birds));

  process.exit();

  // app.listen(8001, () => {
  //   console.log("Listening on port 8001");
  // });
}

try {
  run();
} catch (err) {
  console.log(err);
}
