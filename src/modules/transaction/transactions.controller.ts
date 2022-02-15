import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';

@Controller('/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionservice: TransactionsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
    @Req() request: any,
  ): Promise<Transaction> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);
    createTransactionDto.writer = json.id;

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

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Req() request: any,
    @Param('id') id: string,
    @Body(ValidationPipe) updateTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.transactionservice.update(json.id, id, updateTransactionDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(
    @Param('id') id: string,
    @Req() request: any,
  ): Promise<Transaction> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.transactionservice.delete(json.id, id);
  }
}
