import express from "express";
import mongoose from "mongoose";

async function run() {
  const app = express();
  await mongoose.connect("mongodb://localhost:27017/stoop");

  app.listen(8001, () => {
    console.log("Listening on port 8001");
  });
}

try {
  run();
} catch (err) {
  console.log(err);
}
