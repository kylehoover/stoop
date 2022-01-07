import { Request, Router } from "express";
import { IAddBirdRequest } from "../types";
import { addBird, getBirds } from "../db";
import { transformDoc, transformDocs } from "./helpers";

const router = Router();

router.get("/birds", async (req, res) => {
  const birds = await getBirds();
  res.json(transformDocs(birds));
});

router.post("/birds", async (req: Request<{}, {}, IAddBirdRequest>, res, next) => {
  try {
    const bird = await addBird(req.body.bird);
    res.json(transformDoc(bird));
  } catch (err) {
    next(err);
  }
});

export { router as birdRoutes };
