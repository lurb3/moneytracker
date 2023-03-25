import express from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest.interface';
import { UserSettings } from '../models/userSettings';
import { User } from '../models/user';

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
      let user = await User.findById(req.user._id);

      if (!user){
        res.status(404).json({message: "User not found"});
        return;
      }

      let settings = await UserSettings.findOneAndUpdate({user: req.user._id}, update, options);
      res.status(201).json(settings);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
}