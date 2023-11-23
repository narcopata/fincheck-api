import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { ParseOptionalUUIDPipe } from 'src/shared/pipes/ParseOptionalUUIDPipe';
import { TRANSACTION_TYPES, TransactionType } from './entities/Transaction';
import { ParseOptionalEnumPipe } from 'src/shared/pipes/ParseOptionalEnumPipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  public findAll(
    @ActiveUserId()
    userId: string,
    @Query('month', ParseIntPipe)
    month: number,
    @Query('year', ParseIntPipe)
    year: number,
    @Query('bankAccountId', ParseOptionalUUIDPipe)
    bankAccountId?: string,
    @Query('type', new ParseOptionalEnumPipe(TRANSACTION_TYPES))
    type?: TransactionType,
  ) {
    return this.transactionsService.findAllByUserId({
      filters: {
        month,
        year,
        bankAccountId,
        type,
      },
      userId,
    });
  }

  @Post()
  public create(
    @ActiveUserId()
    userId: string,
    @Body()
    createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Put(':id')
  public update(
    @ActiveUserId()
    userId: string,
    @Param('id')
    id: string,
    @Body()
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update({
      id,
      updateTransactionDto,
      userId,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public remove(
    @Param('id')
    id: string,
  ) {
    return this.transactionsService.remove(id);
  }
}
