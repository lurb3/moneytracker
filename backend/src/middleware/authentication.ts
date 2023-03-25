import express, { RequestHandler, Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest.interface';
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  token = token.split(' ')[1];

  try {
    const decoded= jwt.verify(token, process.env.TOKEN_KEY || '') as JwtPayload;
    (req as AuthenticatedRequest<express.Request>).user = {
      _id: decoded._id,
    };
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default verifyToken;