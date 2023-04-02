import express from 'express';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest.interface';
import { User } from '../models/user';
import { UserSettings } from '../models/userSettings';

export class UserSettingsController {
  public static async update (req: AuthenticatedRequest<express.Request>, res: express.Response): Promise<void>
  {
    const { totalBudget } = req.body;
    const update = { totalBudget };
    const options = {
      new: true, // return the modified document
      upsert: true, // create a new document if none exists
    };

    try {
      const userId = new mongoose.Types.ObjectId(req.user._id);

      let settings = await UserSettings.findOneAndUpdate({user: userId}, update, options);
      res.status(201).json(settings);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
}