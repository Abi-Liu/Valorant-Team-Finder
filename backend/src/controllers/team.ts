import express, { Request, Response } from "express";
import Team from "src/models/Team";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { teamName } = req.body;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};
