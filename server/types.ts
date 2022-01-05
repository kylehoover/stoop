export interface IModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const sessionTypes = ["jumpUp", "lure", "slip"] as const;
export type SessionType = typeof sessionTypes[number];

export const slipDirections = ["crosswind", "downwind", "headwind"] as const;
export type SlipDirection = typeof slipDirections[number];

export const flockEngagementTypes = ["climb", "direct", "lowball"] as const;
export type FlockEngagement = typeof flockEngagementTypes[number];

export interface ITake {
  numTakes: number;
  prey: string;
}

export interface ISlip {
  direction?: SlipDirection;
  flockEngagement?: FlockEngagement;
  takes: ITake[];
}

export interface IEntry {
  dateTime: Date;
  notes: string;
  sessionType?: SessionType;
  slip?: ISlip;
  weight: number;
}

export interface ITarget {
  dateTime: Date;
  weight: number;
}

export interface IBird {
  entries: IEntry[];
  name: string;
  species: string;
  target?: ITarget;
}

export const MAX_BIRD_NAME_LENGTH = 50;
export const MAX_NOTES_LENGTH = 250;
export const MAX_NUM_TAKES = 100;
export const MAX_PREY_LENGTH = 50;
export const MAX_SPECIES_LENGTH = 50;
export const MAX_WEIGHT = 20000;
