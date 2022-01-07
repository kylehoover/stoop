import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { BirdModel } from "./db";
import { birdRoutes } from "./api";

async function run() {
  const app = express();
  await mongoose.connect("mongodb://localhost:27017/stoop");

  app.use(morgan("tiny"));

  app.use(bodyParser.json());

  app.use("/api", birdRoutes);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const message = err?.message ?? "Unknown error";
    console.error("ERROR:", message);
    res.status(500).send({ error: { message: message } });
  });

  app.listen(8001, () => {
    console.log("Listening on port 8001");
  });
}

try {
  run();
} catch (err) {
  console.log(err);
}
