import multer from "multer";
import { Request, Router } from "express";
import {
  IAddBirdRequest,
  INewBird,
  IUpdateBirdRequest,
  IUpdatedBird,
  IUpdateTargetRequest,
} from "../types";
import { addBird, getBird, getBirds, removeTarget, updateBird, updateTarget } from "../db";
import { transformBird, transformBirds } from "./helpers";

const router = Router();

const upload = multer({ dest: "uploads" });

router.get("/birds", async (req, res) => {
  const birds = await getBirds();
  res.json({ birds: transformBirds(birds) });
});

router.get("/birds/:birdId", async (req, res, next) => {
  const { birdId } = req.params;
  const clientMessage = "Failed to load bird";
  let birdModel;

  try {
    birdModel = await getBird(birdId);
  } catch (err: any) {
    err.clientMessage = clientMessage;
    next(err);
    return;
  }

  if (!birdModel) {
    next({ clientMessage, message: `Bird "${birdId}" does not exist`, status: 404 });
    return;
  }

  res.json({ bird: transformBird(birdModel) });
});

router.post(
  "/birds",
  upload.single("imgFile"),
  async (req: Request<{}, {}, IAddBirdRequest>, res, next) => {
    const { name, species } = req.body;
    let birdModel;

    const newBird: INewBird = {
      name,
      species,
      img: req.file?.filename ?? "",
    };

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

router.post(
  "/birds/:birdId",
  upload.single("imgFile"),
  async (req: Request<{ birdId: string }, {}, IUpdateBirdRequest>, res, next) => {
    const { birdId } = req.params;
    const { name, species, targetDateTime, targetWeight } = req.body;
    const clientMessage = "Failed to update bird";
    let birdModel;

    const updatedBird: IUpdatedBird = {
      name,
      species,
    };

    // TODO: remove
    if (targetDateTime !== undefined || targetWeight !== undefined) {
      if (targetDateTime === "" && targetWeight === "") {
        updatedBird.target = undefined;
      } else if (!targetDateTime || !targetWeight) {
        next({
          clientMessage,
          message: "Both target date time and weight are required when at least one is provided",
          status: 400,
        });
        return;
      } else {
        updatedBird.target = {
          dateTime: targetDateTime,
          weight: targetWeight as unknown as number,
        };
      }
    }

    if (req.file) {
      updatedBird.img = req.file.filename;
    }

    try {
      birdModel = await updateBird(birdId, updatedBird);
    } catch (err: any) {
      err.clientMessage = clientMessage;
      next(err);
      return;
    }

    if (!birdModel) {
      next({ clientMessage, message: `Bird "${birdId}" does not exist`, status: 404 });
      return;
    }

    res.json({ bird: transformBird(birdModel) });
  }
);

router.post(
  "/birds/:birdId/target",
  async (req: Request<{ birdId: string }, {}, IUpdateTargetRequest>, res, next) => {
    const { birdId } = req.params;
    const { target } = req.body;
    const clientMessage = "Failed to update target";
    let targetModel;

    try {
      targetModel = await updateTarget(birdId, target);
    } catch (err: any) {
      err.clientMessage = clientMessage;
      next(err);
      return;
    }

    if (!targetModel) {
      next({
        clientMessage,
        message: `Failed to update target; bird "${birdId}" does not exist`,
        status: 404,
      });
      return;
    }

    res.json({ target: targetModel });
  }
);

router.delete("/birds/:birdId/target", async (req, res, next) => {
  const { birdId } = req.params;
  const clientMessage = "Failed to remove target";
  let isSuccess = false;

  try {
    isSuccess = await removeTarget(birdId);
  } catch (err: any) {
    err.clientMessage = clientMessage;
    next(err);
    return;
  }

  if (!isSuccess) {
    next({
      clientMessage,
      message: `Failed to remove target; bird "${birdId}" does not exist`,
      status: 404,
    });
    return;
  }

  res.status(200).send();
});

export { router as birdRoutes };
