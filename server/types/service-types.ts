import { IBirdBase, ITarget } from ".";

export interface IAddBirdRequest {
  name: string;
  species: string;
}

export interface IUpdateBirdRequest {
  name?: string;
  species?: string;
  targetDateTime?: string;
  targetWeight?: string;
}
