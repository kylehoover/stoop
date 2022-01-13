import multer from "multer";
import path from "path";
import { Request, Router } from "express";
import { IAddBirdRequest, INewBird } from "../types";
import { addBird, getBird, getBirds } from "../db";
import { transformDoc, transformDocs } from "./helpers";

const router = Router();

const upload = multer({ dest: "uploads" });

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

  if (bird?.img) {
    bird.img = `/static/birds/${bird.img}`;
  }

  res.json({ bird: transformDoc(bird) });
});

// TODO: need to rework request type
router.post("/birds", upload.single("photo"), async (req: Request, res, next) => {
  let birdModel;
  const newBird: INewBird = {
    ...req.body,
    img: req.file?.filename ?? "",
  };

  console.log(req.body);
  console.log(req.file);

  try {
    birdModel = await addBird(newBird);
  } catch (err: any) {
    err.clientMessage = "Failed to add new bird";
    next(err);
    return;
  }

  res.json({ bird: transformDoc(birdModel) });
});

export { router as birdRoutes };
