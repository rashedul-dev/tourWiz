import { Router } from "express";
import { userRouters } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouters,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
