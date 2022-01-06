import { Router } from "express";
import { getBirds } from "../db";
import { transformDoc, transformDocs } from "./helpers";

const router = Router();

router.get("/birds", async (req, res) => {
  const birds = await getBirds();
  res.json(transformDocs(birds));
});

export { router as birdsRoutes };
