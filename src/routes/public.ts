import express from "express";

import { requireNotAuth } from "../middlewares";

export const publicRouter = express.Router();

publicRouter.get("/", requireNotAuth, (req, res) => {
  res.render("index");
});
