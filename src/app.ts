import express, { NextFunction, Request, Response } from "express";
import { userRouters } from "./app/modules/user/user.route";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status-codes";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouters);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to tourWiz",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
