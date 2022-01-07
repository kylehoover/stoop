import { HydratedDocument } from "mongoose";
import { IBirdModel, IBirdPreviewModel } from "../../types";
import { BirdModel } from "./schema";

export async function getBirds(): Promise<HydratedDocument<IBirdPreviewModel>[]> {
  return BirdModel.find().select("-entries");
}

export async function getBird(id: string): Promise<HydratedDocument<IBirdModel> | null> {
  return BirdModel.findById(id);
}
