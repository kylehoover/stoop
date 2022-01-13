import multer from "multer";
import path from "path";
import { Request, Router } from "express";
import { IAddBirdRequest, INewBird } from "../types";
import { addBird, getBird, getBirds } from "../db";
import { transformBird, transformBirds } from "./helpers";

const router = Router();

const upload = multer({ dest: "uploads" });

router.get("/birds", async (req, res) => {
  const birds = await getBirds();
  res.json({ birds: transformBirds(birds) });
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

  res.json({ bird: transformBird(bird) });
});

router.post(
  "/birds",
  upload.single("photo"),
  async (req: Request<{}, {}, IAddBirdRequest>, res, next) => {
    const newBird: INewBird = {
      ...req.body,
      img: req.file?.filename ?? "",
    };

    let birdModel;

    try {
      birdModel = await addBird(newBird);
    } catch (err: any) {
      err.clientMessage = "Failed to add new bird";
      next(err);
      return;
    }

    res.json({ bird: transformBird(birdModel) });
  }
);

export { router as birdRoutes };
