import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest.interface';
import { User } from '../models/user';
import { UserSettings } from '../models/userSettings';

export class UserAuthenticationController {
  public static async create (req: express.Request, res: express.Response): Promise<void>
  {
    const { username, email, password } = req.body;
    
    const duplicateUser = await User.findOne({ email });

    if (duplicateUser) {
      res.status(400).json({message: "Email already in use"});
      return;
    }

    const user = new User({ username, email, password });
    const token = jwt.sign(
      { _id: user._id, email, username },
      process.env.TOKEN_KEY || '',
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    try {
      await user.save();
      res.status(201).json(Object.assign({}, user.toObject(), { password: undefined }));
      return;
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async signin (req: express.Request, res: express.Response): Promise<void>
  {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("All input is required");
        return;
      }

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { _id: user._id, email, username: user.username },
          process.env.TOKEN_KEY || '',
          {
            expiresIn: "2h",
          }
        );

        user.password = null;
        user.token = token;

        res.status(200).json(user);
        return;
      }
      res.status(400).send("Invalid Credentials");
      return;
    } catch (err) {
      console.log(err);
    }
  }

  public static async getMe (req: AuthenticatedRequest<express.Request>, res: express.Response): Promise<void>
  {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const userSettings = await UserSettings.findOne({user: userId});

    user.password = null;

    res.status(200).json({
      user,
      settings: userSettings
    })
  }
}