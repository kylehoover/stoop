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

export interface IEntryBase<TDateTime> {
  dateTime: TDateTime;
  notes: string;
  sessionType?: SessionType;
  slip?: ISlip;
  weight: number;
}

export interface IEntryModel extends IEntryBase<Date> {}

export interface IEntry extends IEntryBase<string> {}

export interface ITargetBase<TDateTime> {
  dateTime: TDateTime;
  weight: number;
}

export interface ITargetModel extends ITargetBase<Date> {}

export interface ITarget extends ITargetBase<string> {}

export interface IBirdBase<TEntry, TTarget> {
  entries: TEntry[];
  name: string;
  species: string;
  target?: TTarget;
}

export interface IBirdModel extends IBirdBase<IEntryModel, ITargetModel> {}

export interface IBird extends IBirdBase<IEntry, ITarget> {}

export const MAX_BIRD_NAME_LENGTH = 50;
export const MAX_NOTES_LENGTH = 250;
export const MAX_NUM_TAKES = 100;
export const MAX_PREY_LENGTH = 50;
export const MAX_SPECIES_LENGTH = 50;
export const MAX_WEIGHT = 20000;
