import { HydratedDocument } from "mongoose";
import { IBirdModel, INewBird, ITarget, ITargetModel, IUpdatedBird } from "../../types";
import { BirdModel } from "./schema";

export async function addBird(bird: INewBird): Promise<HydratedDocument<IBirdModel>> {
  const birdModel = new BirdModel(bird);
  await birdModel.save();
  return birdModel;
}

export async function updateBird(
  id: string,
  bird: IUpdatedBird
): Promise<HydratedDocument<IBirdModel> | null> {
  return await BirdModel.findByIdAndUpdate(id, bird, { new: true, runValidators: true });
}

export async function updateTarget(birdId: string, target: ITarget): Promise<ITargetModel | null> {
  const birdModel = await BirdModel.findByIdAndUpdate(
    birdId,
    { target },
    { new: true, runValidators: true }
  );

  return birdModel?.target ?? null;
}

export async function removeTarget(birdId: string): Promise<boolean> {
  const birdModel = await BirdModel.findByIdAndUpdate(
    birdId,
    { $unset: { target: "" } },
    { new: true, runValidators: true }
  );

  return !!birdModel;
}
