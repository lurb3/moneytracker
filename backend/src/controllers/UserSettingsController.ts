import express from 'express';
import { UserSettings } from '../models/userSettings';
import { User } from '../models/user';

export class UserSettingsController {
  public static async update (req: express.Request, res: express.Response): Promise<void>
  {
    const { totalBudget } = req.body;
    const userId = req.params.userId;
    const update = { totalBudget };
    const options = {
      new: true, // return the modified document
      upsert: true, // create a new document if none exists
    };

    try {
      let user = await User.findById(userId);

      if (!user){
        res.status(404).json({message: "User not found"});
        return;
      }

      let settings = await UserSettings.findOneAndUpdate({user: userId}, update, options);
      res.status(201).json(settings);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
}