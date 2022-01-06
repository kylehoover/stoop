import { HydratedDocument } from "mongoose";
import { IBirdPreviewModel } from "../../types";
import { BirdModel } from "./schema";

export async function getBirds(): Promise<HydratedDocument<IBirdPreviewModel>[]> {
  return BirdModel.find().select("-entries");
}
