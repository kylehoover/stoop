import { HydratedDocument } from "mongoose";
import { BirdModel } from "./schema";
import { IBirdModel, INewBird, IUpdatedBird } from "../../types";

export async function addBird(bird: INewBird): Promise<HydratedDocument<IBirdModel>> {
  const birdModel = new BirdModel(bird);
  await birdModel.save();
  return birdModel;
}

export async function updateBird(
  id: string,
  bird: IUpdatedBird
): Promise<HydratedDocument<IBirdModel> | null> {
  const birdModel = await BirdModel.findByIdAndUpdate(id, bird, { new: true });

  if (birdModel && bird.hasOwnProperty("target") && !bird.target) {
    birdModel.target = undefined;
    birdModel.save();
  }

  return birdModel;
}
