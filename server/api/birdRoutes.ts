import { Request, Router } from "express";
import { IAddBirdRequest } from "../types";
import { addBird, getBird, getBirds } from "../db";
import { transformDoc, transformDocs } from "./helpers";

const router = Router();

router.get("/birds", async (req, res) => {
  const birds = await getBirds();
  res.json({ birds: transformDocs(birds) });
});

router.get("/birds/:birdId", async (req, res, next) => {
  const { birdId } = req.params;
  let bird;

  try {
    bird = await getBird(birdId);
  } catch (err: any) {
    err.clientMessage = "Invalid id";
    next(err);
    return;
  }

  res.json({ bird: transformDoc(bird) });
});

router.post("/birds", async (req: Request<{}, {}, IAddBirdRequest>, res, next) => {
  let bird;
  console.log(req.body);
  console.log(req.fields);
  console.log(req.files);

  try {
    // bird = await addBird(req.body.bird);
    throw new Error();
  } catch (err: any) {
    err.clientMessage = "Failed to add new bird";
    next(err);
    return;
  }

  res.json({ bird: transformDoc(bird) });
});

export { router as birdRoutes };
