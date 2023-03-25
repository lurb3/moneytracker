import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from 'zod';

const validateSchema = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (e) {
      return res.status(400).send(e);
    }
}

export default validateSchema;