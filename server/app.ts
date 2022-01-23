import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { birdRoutes } from "./api";

// TODO: add caching policy

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
    const status = err?.status ?? 500;
    console.log("ERROR:", message);
    res.status(status).send({ error: { message: clientMessage } });
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
