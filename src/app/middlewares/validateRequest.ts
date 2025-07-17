import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (ZodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("📥 Request body before validation:", req.body);
      req.body = await ZodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      console.error("❌ Zod validation failed", error);

      next(error);
    }
  };



