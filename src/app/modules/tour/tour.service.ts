// CREATE -> GETALL -> UPDATE -> DELETE => THIS IS THE WHOLE GAME

import AppError from "../../errorHelpers/AppError";
import { excludeField } from "../../globalConstants";
import { tourSearchableFields } from "./tour.constant";
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

const getAllTours = async (query: Record<string, string>) => {
  console.log(query);

  const filter = query;
  const search = query.search || "";
  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = page - 1 * limit;

  //field filtering - to get sprecific data
  const fields = query.fields?.split("_").join(" ") || "";

  // delete filter["search"];
  // delete filter["sort"];

  for (const field of excludeField) {
    delete filter[field];
  }

  // const tourSearchableFields = ["title", "description", "location"];

  const searchQuery = {
    $or: tourSearchableFields.map((field) => ({ [field]: { $regex: search, $options: "i" } })),
  };
  const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);

  // {
  // $or: searchArray,
  /** SAME AS BELLOW - JUST TO CLEAN THE CODE */
  // title: { $regex: search, $options: "i" },
  // $or: [
  //   { title: { $regex: search, $options: "i" } },
  //   { description: { $regex: search, $options: "i" } },
  //   { location: { $regex: search, $options: "i" } },
  // ],
  // }

  const totalTours = await Tour.countDocuments();
  const totalPage = Math.ceil(totalTours / limit);
  const meta = {
    page: page,
    total: totalTours,
    totalPage: totalPage,
    limit: limit,
  };
  return {
    data: tours,
    meta: meta,
    // meta: {
    //   total: totalTours,
    // },
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const tour = await Tour.findById(id);
  if (!tour) {
    throw new AppError(401, "Tour not found");
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updatedTour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};
/* ------------------- HERE TOURTYPE SERVICE LAYER ----------------- */

const createTourType = async (payload: ITourType) => {
  const { name } = payload;
  const existingTourType = await TourType.findOne({ name });

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
