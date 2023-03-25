import express from 'express';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest.interface';
import { User } from '../models/user';

export class UserController {
  public static async show (req: AuthenticatedRequest<express.Request>, res: express.Response): Promise<void>
  {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
      }

      res.status(200).json(user);
      return;
    }
    catch (err: unknown) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  public static async delete (req: AuthenticatedRequest<express.Request>, res: express.Response): Promise<void>
  {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        res.status(404).json({message: 'User not found'});
        return;
      }
      
      await user.deleteOne({_id: req.user._id});

      res.status(200).json({message: "User deleted successfully"});
    }
    catch (err: unknown) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}