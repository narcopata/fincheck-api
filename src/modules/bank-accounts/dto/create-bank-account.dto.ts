import {
  IsHexColor,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BankAccountType, BankAccountTypes } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsIn(Object.values(BankAccountTypes))
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
