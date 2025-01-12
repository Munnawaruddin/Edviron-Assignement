import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction') private readonly transactionModel: Model<Transaction>,
  ) {}

  async fetchAllTransactions() {
    return this.transactionModel.find().exec();
  }

  async fetchTransactionsBySchool(school_id: string) {
    return this.transactionModel.find({ school_id }).exec();
  }

  async checkTransactionStatus(custom_order_id: string) {
    return this.transactionModel.findOne({ custom_order_id }).exec();
  }

  async updateTransactionStatus(order_id: string, status: string) {
    return this.transactionModel.updateOne({ collect_id: order_id }, { status });
  }

  async manualStatusUpdate(custom_order_id: string, status: string) {
    return this.transactionModel.updateOne({ custom_order_id }, { status });
  }
}
