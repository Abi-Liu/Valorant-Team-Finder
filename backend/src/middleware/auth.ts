//middleware to ensure user is logged in before using the app
import { Request, Response, NextFunction } from "express";

export default {
  ensureAuth: function (req: Request, res: Response, next: NextFunction) {
    console.log("is authenticated: ", req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({ message: "User not authorized" });
    }
  },
};
