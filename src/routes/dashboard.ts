import express from "express";

import { requireAuth } from "../middlewares";

export const dashboardRouter = express.Router();

dashboardRouter.use(requireAuth);

dashboardRouter.get("/", requireAuth, (req, res) => {
  res.render("dashboard", {
    user: {
      name: req.user?.name,
      email: req.user?.email,
    },
  });
});
