import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: user,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  // const token = req.headers.authorization;
  // const verfifiedToken = verifyToken(
  //   token as string,
  //   envVars.JWT_ACCESS_SECRET
  // ) as JwtPayload;

  const verifiedToken = req.user;
  const payload = req.body;
  const user = await UserServices.updateUser(userId, payload, verifiedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Updated Successfully",
    data: user,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  console.log(payload);
  const result = await UserServices.getAllUsers();
  console.log(result.data, result.meta);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "All Users Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
};

// route matching -> controller -> service -> model -> DB
