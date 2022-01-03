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

export interface ISlipInfo {
  direction: SlipDirection;
  flockEngagement: FlockEngagement;
  takes: ITake[];
}

export interface IEntry {
  dateTime: string;
  notes: string;
  sessionType?: SessionType;
  slipInfo?: ISlipInfo;
  weight: number;
}

export interface ITarget {
  dateTime: string;
  weight: number;
}

export interface IBird {
  entries: IEntry[];
  name: string;
  species: string;
  target?: ITarget;
}

export const MAX_BIRD_NAME_LENGTH = 50;

export const MAX_BIRD_SPECIES_LENGTH = 50;
