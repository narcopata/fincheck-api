import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  public findAll() {
    return this.transactionsService.findAllByUserId();
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
