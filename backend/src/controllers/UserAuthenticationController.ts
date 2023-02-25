import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

export class UserAuthenticationController {
  public static async signup (req: express.Request, res: express.Response): Promise<void>
  {
    const { username, email, password } = req.body;
    const user = new User({username, email, password});
    const token = jwt.sign(
      { _id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    try {
      await user.save();
      res.status(201).json(Object.assign({}, user.toObject(), { password: undefined }));
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
      }

      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { _id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        user.token = token;

        res.status(200).json(user);
        return;
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  }
}