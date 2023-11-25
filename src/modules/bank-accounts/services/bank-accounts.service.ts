import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../../shared/database/repositories/bank-accounts.repositories';
import { AssertBankAccountUserRelationService } from './assert-bank-account-user-relation.service';
import { TRANSACTION_TYPES } from 'src/modules/transactions/entities/Transaction';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly assertBankAccountUserRelationService: AssertBankAccountUserRelationService,
  ) {}

  public async create(
    userId: string,
    createBankAccountDto: CreateBankAccountDto,
  ) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        color,
        userId,
        initialBalance,
        name,
        type,
      },
    });
  }

  public async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
      include: {
        transaction: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transaction, ...bankAccount }) => {
      const totalInTransactions = transaction.reduce((acc, transaction) => {
        return (
          acc +
          (transaction.type === TRANSACTION_TYPES.INCOME
            ? transaction.value
            : -transaction.value)
        );
      }, 0);

      const currentBalance = bankAccount.initialBalance + totalInTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  public async update(
    data: {
      id: string;
      userId: string;
    } & UpdateBankAccountDto,
  ) {
    const { id, userId, ...updateBankAccountDto } = data;

    await this.assertBankAccountUserRelationService.assert(id, userId);

    return this.bankAccountsRepository.updateOne({
      id,
      userId,
      ...updateBankAccountDto,
    });
  }

  public async remove(userId: string, id: string) {
    await this.assertBankAccountUserRelationService.assert(id, userId);

    await this.bankAccountsRepository.delete({
      where: {
        id,
        userId,
      },
    });

    return null;
  }
}
