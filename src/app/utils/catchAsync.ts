import { NextFunction, Request, Response } from "express";

//function => try-catch catch => req-res-next function

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(err);
      next(err);
    });
  };
