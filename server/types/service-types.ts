import { IBirdBase, ITarget } from ".";

export interface INewBird extends IBirdBase<ITarget> {}

export interface IAddBirdRequest {
  name: string;
  species: string;
}
