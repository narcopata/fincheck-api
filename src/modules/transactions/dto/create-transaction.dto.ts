import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TRANSACTION_TYPES, TransactionType } from '../entities/Transaction';

export class CreateTransactionDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  @IsIn(Object.values(TRANSACTION_TYPES))
  @IsNotEmpty()
  type: TransactionType;
}
