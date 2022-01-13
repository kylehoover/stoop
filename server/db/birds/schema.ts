import { model, Schema } from "mongoose";
import {
  flockEngagementTypes,
  IBirdModel,
  ISlip,
  ITake,
  ITargetModel,
  MAX_BIRD_NAME_LENGTH,
  MAX_SPECIES_LENGTH,
  MAX_NUM_TAKES,
  MAX_PREY_LENGTH,
  slipDirections,
  IEntryModel,
  MAX_NOTES_LENGTH,
  sessionTypes,
  MAX_WEIGHT,
} from "../../types";

const takeSchema = new Schema<ITake>(
  {
    numTakes: {
      type: Number,
      required: true,
      max: MAX_NUM_TAKES,
      min: 1,
    },
    prey: {
      type: String,
      required: true,
      maxlength: MAX_PREY_LENGTH,
      minlength: 1,
      trim: true,
    },
  },
  { _id: false }
);

const slipSchema = new Schema<ISlip>(
  {
    direction: {
      type: String,
      enum: slipDirections,
    },
    flockEngagement: {
      type: String,
      enum: flockEngagementTypes,
    },
    takes: {
      type: [takeSchema],
      default: [],
    },
  },
  { _id: false }
);

const entrySchema = new Schema<IEntryModel>(
  {
    dateTime: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: "",
      maxlength: MAX_NOTES_LENGTH,
      trim: true,
    },
    sessionType: {
      type: String,
      enum: sessionTypes,
    },
    slip: slipSchema,
    weight: {
      type: Number,
      required: true,
      max: MAX_WEIGHT,
      min: 1,
    },
  },
  { _id: false }
);

const targetSchema = new Schema<ITargetModel>(
  {
    dateTime: {
      type: Date,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      max: MAX_WEIGHT,
      min: 1,
    },
  },
  { _id: false }
);

const birdSchema = new Schema<IBirdModel>(
  {
    entries: {
      type: [entrySchema],
      default: [],
    },
    name: {
      type: String,
      required: true,
      maxlength: MAX_BIRD_NAME_LENGTH,
      minlength: 1,
      trim: true,
    },
    img: {
      type: String,
      default: "",
    },
    species: {
      type: String,
      default: "",
      maxlength: MAX_SPECIES_LENGTH,
      trim: true,
    },
    target: targetSchema,
  },
  { timestamps: true }
);

export const BirdModel = model("Bird", birdSchema);
