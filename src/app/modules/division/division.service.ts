import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const isDivisionExist = await Division.findOne({ name: payload.name });

  if (isDivisionExist) {
    throw new AppError(401, `${payload.name} division is already exist`);
  }

  const division = await Division.create(payload);
  return division;
};

const getAllDivisions = async () => {
  const divisions = await Division.find({});
  const totalDivisions = await Division.countDocuments();

  return {
    data: divisions,
    meta: {
      total: totalDivisions,
    },
  };
};

const getSingleDivision = async (slug: string) => {
  return await Division.findOne({ slug });
};

const updateDivision = async (id: string, payload: Partial<IDivision>): Promise<IDivision | null> => {
  const isDivisionExist = await Division.findById(id);
  if (!isDivisionExist) {
    throw new AppError(401, "Division not Found");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(401, `${payload.name} Division already Exist`);
  }

  const updateDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

  return updateDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionServices = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
