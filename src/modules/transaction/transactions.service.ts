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
      throw new Error('글을 찾지 못했습니다.');
    }

    return transaction;
  }

  async update(
    userid: string,
    id: string,
    transactiondto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({ id });
    if (!transaction) {
      throw new Error('글을 찾지 못했습니다.');
    } else if (transaction.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }

    const result = await this.transactionModel.findOneAndUpdate(
      { id },
      transactiondto,
    );

    return result;
  }

  async delete(userid: string, id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findOne({ id });
    if (!transaction) {
      throw new Error('글을 찾지 못했습니다.');
    } else if (transaction.writer !== userid) {
      throw new Error('권한이 없습니다!');
    }
    const result = await this.transactionModel.findOneAndDelete({ id });

    return result;
  }
}
