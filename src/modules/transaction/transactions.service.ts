import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(transactiondto: CreateTransactionDto): Promise<Transaction> {
    const transaction = {
      ...transactiondto,
    };
    const result = await this.transactionModel.create(transaction);

    return result;
  }

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find();

    return transactions;
  }

  async find(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({ id });
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction;
  }

  async findByOriginalId(original: ObjectId): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({ original });
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction;
  }

  async update(
    id: string,
    transactiondto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionModel.findOneAndUpdate(
      { id },
      transactiondto,
    );

    return transaction;
  }
}
