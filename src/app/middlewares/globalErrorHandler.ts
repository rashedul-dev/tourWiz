import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handlevalidationError";
import { handleZodError } from "../helpers/handleZodError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (envVars.NODE_ENV == "development") {
    console.log(err);
  }
  let statusCode = 500;
  let message = `something went wrong!!${err.message} from global error`;

  // ALL MOVED TO HELPERS FOLDER
  // handleDuplicateError;
  // handleCastError;
  // handleValidationError;
  // handleZodError;

  let errorSources: TErrorSources[] = [
    // HOW ERROR WOULD LOOK LIKE
    // {
    //   path: "isDeleted",
    //   message: "Cast Failed",
    // },
  ];

  //Duplicate email error
  if (err.code == 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  //CastError - Wrong ObjectId
  else if (err.name == "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  //ZOD Validation Error
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }
  //Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
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
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};

/**
 * ZOD ERROR
 *  - Zod validation error
 *
 */
/**
 * MONGOOSE ERROR
 *  - duplicate
 *  - cast error - mongoDB ObjectId given wrong
 */
