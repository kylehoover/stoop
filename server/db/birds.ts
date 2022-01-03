import { model, Schema } from "mongoose";
import { IBird, MAX_BIRD_NAME_LENGTH, MAX_BIRD_SPECIES_LENGTH } from "../types";

const birdSchema = new Schema<IBird>({
  name: {
    type: String,
    required: true,
    maxlength: MAX_BIRD_NAME_LENGTH,
    trim: true,
  },
  species: {
    type: String,
    required: true,
    maxlength: MAX_BIRD_SPECIES_LENGTH,
    trim: true,
  },
  target: {
    dateTime: {
      type: Date,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
  },
});
