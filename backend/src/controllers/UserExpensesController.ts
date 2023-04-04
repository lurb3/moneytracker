import { parse } from 'date-fns';
import express from 'express';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest.interface';
import { User } from '../models/user';
import { UserExpenses } from '../models/userExpenses';
import { UserSettings } from '../models/userSettings';

interface ExpenseQuery {
  fromDate?: string | Date,
  toDate?: string | Date
}

export class UserExpensesController {
  public static async index (req: AuthenticatedRequest<ExpenseQuery>, res: express.Response): Promise<void>
  {
    let { fromDate, toDate } = req.query;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    fromDate = fromDate ? parse(fromDate.toString(), 'dd-MM-yyyy', new Date()).toISOString() : new Date().toISOString();
    toDate = toDate ? parse(toDate.toString(), 'dd-MM-yyyy', new Date()).toISOString() : new Date().toISOString();

    const expenses = await UserExpenses.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: new Date(fromDate), $lte: new Date(toDate) }
        }
      },
      {
        $group: {
          _id: null,
          expenses: { $push: '$$ROOT' },
          total: { $sum: '$total' }
        }
      },
      {
        $unwind: '$expenses'
      },
      {
        $replaceRoot: {
          newRoot: '$expenses'
        }
      }
    ]);

    res.status(200).json(expenses);
  }

  public static async create (req: AuthenticatedRequest<express.Request>, res: express.Response): Promise<void>
  {
    let { name, total, date = new Date().toISOString(), description, category } = req.body;

    date = parse(date, 'dd-MM-yyyy', new Date());

    const userId = req.user._id;
    const expense = new UserExpenses({ name, total, date, description, category, user: userId });
    const userSettings = await UserSettings.findOne({ user: userId });
    const user = await User.findById(userId);

    if (userSettings.updateTotalBudget) {
      user.totalBudget = user.totalBudget - parseFloat(expense.total);
      user.save();
    }

    try {
      await expense.save();
      res.status(201).json({ expense, user });
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  }

}