import { NextFunction, Request, Response } from "express";

const validateSchema = (schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (e) {
      return res.status(400).send(e?.details[0]?.message);
    }
}

export default validateSchema;