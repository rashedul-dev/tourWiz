import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionZodSchema } from "./division.validation";
import { DivisionController } from "./division.controller";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionZodSchema),
  DivisionController.createDivision
);
router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionZodSchema),
  DivisionController.getAllDivisions
);
router.get(
  "/:slug",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionZodSchema),
  DivisionController.getSingleDivision
);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionZodSchema),
  DivisionController.updateDivision
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createDivisionZodSchema),
  DivisionController.deleteDivision
);

export const DivisionRoutes = router;
