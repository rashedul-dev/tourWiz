import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";

const createTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await TourService.createTour(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour Created Successfully",
    data: result,
  });
});
const getAllTours = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;
  const result = await TourService.getAllTours(query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Tour Retrived Successfully",
    data: result.data,
    meta: result.meta,
  });
});
const updateTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;
  const result = await TourService.updateTour(id, body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour Updated Successfully",
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await TourService.deleteTour(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour Created Successfully",
    data: result,
  });
});

/* ------------------- HERE TOURTYPE CONTROLLER LAYER ----------------- */

const createTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    throw new AppError(400, "Tour type name is required");
  }
  const result = await TourService.createTourType({ name });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour Type Created Successfully",
    data: result,
  });
});
const getAllTourTypes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await TourService.getAllTourTypes();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Tour Type Retrived Successfully",
    data: result,
  });
});
const updateTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;
  const result = await TourService.updateTourType(id, body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour Type Updated Successfully",
    data: result,
  });
});
const deleteTourType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const result = await TourService.deleteTourType(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour Type Updated Successfully",
    data: result,
  });
});

export const TourController = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
export const TourTypeController = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
};
