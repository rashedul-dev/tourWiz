import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = `something went wrong!!${err.message} from global error`;

  const errorSources: any = [
    // HOW ERROR WOULD LOOK LIKE
    // {
    //   path: "isDeleted",
    //   message: "Cast Failed",
    // },
  ];

  /**
   * ZOD ERROR
   *
   */
  /**
   * MONGOOSE ERROR
   *  - duplicate
   *  - cast error - mongoDB ObjectId given wrong
   */

  //duplicate email error
  if (err.code == 11000) {
    console.log("Duplicate Error", err.message);
    const matchArray = err.message.match(/"([^"]*)"/);
    (statusCode = 400), (message = `${matchArray[1]} already Exist!!`);
  }
  //CastError - Wrong ObjectId
  else if (err.name == "CastError") {
    (statusCode = 400), (message = "Invalid MongoDB ObjectId, please provied a valid id");
  }
  //ZOD
  else if (err.name === "ZodError") {
    statusCode = 400;
    message = "zod Erorr";

    err.issues.forEach((issue: any) => {
      console.log(issue);
      errorSources.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });
  }
  //Validation Error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);

    errors.forEach((errorObjects: any) =>
      errorSources.push({
        path: errorObjects.path,
        message: errorObjects.message,
      })
    );
    console.log(errorSources);
    message = "Validation Error Occured";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
