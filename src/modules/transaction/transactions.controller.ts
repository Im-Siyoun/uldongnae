import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';

@Controller('/transactions')
export class TransactionsController {
  constructor(private readonly transactionservice: TransactionsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionservice.create(
      createTransactionDto,
    );

    return transaction;
  }

  @Get('/')
  @HttpCode(200)
  async find(): Promise<Transaction[]> {
    return this.transactionservice.findAll();
  }
}
