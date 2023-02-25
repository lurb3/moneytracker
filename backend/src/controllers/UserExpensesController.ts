import express from 'express';
import { parse } from 'date-fns'
import { UserExpenses } from '../models/userExpenses';
import mongoose from 'mongoose';

export class UserExpensesController {
  public static async index (req: express.Request, res: express.Response): Promise<void>
  {
    let { fromDate, toDate} = req.body;
    const userId = new mongoose.Types.ObjectId(req.user._id);

    fromDate = fromDate ? parse(fromDate, 'dd-MM-yyyy', new Date()) : new Date();
    toDate = toDate ? parse(toDate, 'dd-MM-yyyy', new Date()) : new Date();

    //const expenses = await UserExpenses.find({ user: req.user._id, date: {$gte: new Date(fromDate), $lte: new Date(toDate)} });
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
      }
    ]);

    res.status(200).json(expenses);
  }

  public static async create (req: express.Request, res: express.Response): Promise<void>
  {
    let { total, date  } = req.body;

    if (!date) {
      date = new Date();
    } else {
      date = parse(date, 'dd-MM-yyyy', new Date());
    }

    const expense = new UserExpenses({ total, date, user: req.user._id });

    try {
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }

}