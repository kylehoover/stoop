import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { BirdModel } from "./db";
import { birdRoutes } from "./api";

async function run() {
  const app = express();
  await mongoose.connect("mongodb://localhost:27017/stoop");

  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use("/api", birdRoutes);
  app.use("/static/birds", express.static("uploads"));

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const clientMessage = err?.clientMessage ?? "Unknown error";
    const message = err?.message ?? "Unknown error";
    console.log("ERROR:", message);
    res.status(500).send({ error: { message: clientMessage } });
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
