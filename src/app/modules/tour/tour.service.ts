// CREATE -> GETALL -> UPDATE -> DELETE => THIS IS THE WHOLE GAME

import AppError from "../../errorHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTour = async (payload: ITour) => {
  const isTourExist = await Tour.findOne({ title: payload.title });

  if (isTourExist) {
    throw new AppError(401, `${payload.title} title already exists`);
  }

  const tour = await Tour.create(payload);
  return tour;
};

const getAllTours = async () => {
  const tours = await Tour.find({});
  const totalTours = await Tour.countDocuments();
  return {
    data: tours,
    meta: {
      total: totalTours,
    },
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const isTourExist = await Tour.findById(id);
  if (!isTourExist) {
    throw new AppError(401, "Tour not found");
  }

  const updateTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updateTour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};
/* ------------------- HERE TOURTYPE SERVICE LAYER ----------------- */

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ name: payload.name });

  if (existingTourType) {
    throw new Error("Tour type already exists.");
  }

  return await TourType.create({ name });
};
const getAllTourTypes = async () => {
  return await TourType.find();
};
const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
  return updatedTourType;
};
const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  return await TourType.findByIdAndDelete(id);
};

export const TourService = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
};
