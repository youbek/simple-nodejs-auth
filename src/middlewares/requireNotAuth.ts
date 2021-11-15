import { Request, Response, NextFunction } from "express";

// Requires from user not being authenticated
export function requireNotAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    return res.redirect("/dashboard");
  }

  return next();
}
