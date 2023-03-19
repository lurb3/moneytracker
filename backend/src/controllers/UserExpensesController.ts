import express from 'express';
import { parse } from 'date-fns'
import { UserExpenses } from '../models/userExpenses';
import mongoose from 'mongoose';

export class UserExpensesController {
  public static async index (req: express.Request, res: express.Response): Promise<void>
  {
    let { fromDate, toDate} = req.query;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    fromDate = fromDate ? parse(fromDate, 'dd-MM-yyyy', new Date()) : new Date();
    toDate = toDate ? parse(toDate, 'dd-MM-yyyy', new Date()) : new Date();

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

  public static async create (req: express.Request, res: express.Response): Promise<void>
  {
    let { name, total, date = new Date().toISOString(), description, category } = req.body;

    date = parse(date, 'dd-MM-yyyy', new Date());

    const expense = new UserExpenses({ name, total, date, description, category, user: req.user._id });

    try {
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  }

}