import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { DivisionServices } from "./division.service";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await DivisionServices.createDivision(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Division Created Successfully",
    data: result,
  });
});
const getAllDivisions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await DivisionServices.getAllDivisions();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Divisions retrive Successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getSingleDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await DivisionServices.getSingleDivision(req.params.slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Divisions retrive Successfully",
    data: result,
  });
});
const GetDivisionBySlug = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const result = await DivisionServices.getDivisionBySlug(slug);

  res.status(200).json({
    success: true,
    message: "Division retrieved successfully",
    data: result,
  });
});
const updateDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;
  const result = await DivisionServices.updateDivision(id, body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division updated Successfully",
    data: result,
  });
});
const deleteDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await DivisionServices.deleteDivision(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Division deleted Successfully",
    data: result,
  });
});

export const DivisionController = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  GetDivisionBySlug,
  updateDivision,
  deleteDivision,
};
