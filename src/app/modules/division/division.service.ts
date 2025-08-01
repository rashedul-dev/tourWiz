import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const baseSlug = payload.name.toLocaleLowerCase().split(" ").join("-");
  let slug = `${baseSlug}-division`;
  console.log(slug);

  let counter = 0;

  while (await Division.exists({ slug })) {
    slug = `${slug}-${counter++}`; // dhaka-division-0
  }
  payload.slug = slug;
  const division = await Division.create(payload);

  // const isDivisionExist = await Division.findOne({ name: payload.name });

  // if (isDivisionExist) {
  //   throw new AppError(401, `${payload.name} division is already exist`);
  // }

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
  const division = await Division.findOne({ slug });

  return {
    data: division,
  };
};
const getDivisionBySlug = async (slug: string) => {
  const division = await Division.findOne({ slug });

  if (!division) {
    throw new AppError(404, "Division not found");
  }

  return division;
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

  const division = await Division.findById(id);
  if (!division) {
    throw new AppError(404, "Tour not found");
  }

  const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

  return updatedDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionServices = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  getDivisionBySlug,
  updateDivision,
  deleteDivision,
};
