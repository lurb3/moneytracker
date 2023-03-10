import express from 'express';
import { User } from '../models/user';

export class UserController {
  public static async create (req: express.Request, res: express.Response): Promise<void>
  {
    const { username, email, password } = req.body;
    const user = new User({username, email, password});

    try {
      await user.save();
      res.status(201).json(Object.assign({}, user.toObject(), { password: undefined }));
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async show (req: express.Request, res: express.Response): Promise<void>
  {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }

      return res.status(200).json(user);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }

  public static async delete (req: express.Request, res: express.Response): Promise<void>
  {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      
      await user.deleteOne({_id: req.user._id});

      return res.status(200).json({message: "User deleted successfully"});
    }
    catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
}