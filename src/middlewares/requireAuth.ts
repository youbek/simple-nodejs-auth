import { Request, Response, NextFunction } from "express";

// Requires from user to be authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.redirect("/signin");
  }

  return next();
}
