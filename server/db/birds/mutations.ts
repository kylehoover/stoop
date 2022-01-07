import { HydratedDocument } from "mongoose";
import { BirdModel } from "./schema";
import { IBirdModel, INewBird } from "../../types";

export async function addBird(bird: INewBird): Promise<HydratedDocument<IBirdModel>> {
  const birdModel = new BirdModel(bird);
  await birdModel.save();
  return birdModel;
}
