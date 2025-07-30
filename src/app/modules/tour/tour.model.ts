import { model, Schema, Types } from "mongoose";
import { ITour, ITourType } from "./tour.interface";
import { number, string } from "zod";

const tourTypeSchema = new Schema<ITourType>(
  { name: { type: String, required: true, unique: true } },
  {
    timestamps: true,
  }
);
export const TourType = model<ITourType>("TourType", tourTypeSchema);

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: { type: [string], default: [] },
    location: { type: String },
    costFrom: { type: number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [string], default: [] },
    excluded: { type: [string], default: [] },
    amenities: { type: [string], default: [] },
    tourPlan: { type: [string], default: [] },
    maxGuest: { type: number },
    minAge: number,
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
      required: true,
    },
    tourType: {
      type: Schema.Types.ObjectId,
      ref: "TourType",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tour = model<ITour>("Tour", tourSchema);
