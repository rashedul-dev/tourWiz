import { Router } from "express";
import { TourController, TourTypeController } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
  updateTourTypeZodSchema,
  updateTourZodSchema,
} from "./tour.validation";

const router = Router();

/** ----------------- TOUR TOUTES ----------------*/

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  TourController.createTour
);
router.get(
  "/",
  //   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  //   validateRequest(createTourZodSchema),
  TourController.createTour
);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourZodSchema),
  TourController.updateTour
);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTour);

/** ----------------- TOUR TYPR TOUTES ----------------*/
router.post(
  "create-tour-type",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  TourTypeController.createTourType
);
router.get("/tour-types", TourTypeController.getAllTourTypes);
router.patch(
  "tour-type/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourTypeZodSchema),
  TourTypeController.updateTourType
);
router.delete("tour-type/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourTypeController.deleteTourType);

export const TourRoutes = router;
