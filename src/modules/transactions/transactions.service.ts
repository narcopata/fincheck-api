import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { AssertBankAccountUserRelationService } from '../bank-accounts/services/assert-bank-account-user-relation.service';
import { AssertTransactionUserRelationService } from './services/assert-transaction-user-relation.service';
import { AssertCategoryUserRelationService } from '../categories/services/assert-category-user-relation.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly assertTransactionUserRelationService: AssertTransactionUserRelationService,
    private readonly assertBankAccountUserRelationService: AssertBankAccountUserRelationService,
    private readonly assertCategoryUserRelationService: AssertCategoryUserRelationService,
  ) {}

  private async assertRelations(
    data: {
      userId: string;
    } & {
      [key in 'categoryId' | 'bankAccountId' | 'transactionId']?: string;
    },
  ) {
    const { userId, categoryId, bankAccountId, transactionId } = data;

    await Promise.all([
      bankAccountId &&
        this.assertBankAccountUserRelationService.assert(bankAccountId, userId),
      categoryId &&
        this.assertCategoryUserRelationService.assert(categoryId, userId),
      transactionId &&
        this.assertTransactionUserRelationService.assert(transactionId, userId),
    ]);
  }

  public async findAllByUserId(data: {
    userId: string;
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    };
  }) {
    const {
      userId,
      filters: { month, year, bankAccountId, type },
    } = data;

    return this.transactionsRepository.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1)),
        },
        bankAccountId,
        type,
      },
    });
  }

  public async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const { categoryId, bankAccountId, date, name, type, value } =
      createTransactionDto;

    await this.assertRelations({
      userId,
      bankAccountId,
      categoryId,
    });

    const transaction = await this.transactionsRepository.create({
      data: {
        userId,
        date,
        name,
        type,
        value,
        bankAccountId,
        categoryId,
      },
    });

    return transaction;
  }

  public async update(data: {
    id: string;
    userId: string;
    updateTransactionDto: UpdateTransactionDto;
  }) {
    const { id, updateTransactionDto, userId } = data;

    await this.assertRelations({
      userId,
      transactionId: id,
      bankAccountId: updateTransactionDto.bankAccountId,
      categoryId: updateTransactionDto.categoryId,
    });

    const updatedTransaction = await this.transactionsRepository.update({
      where: {
        id,
      },
      data: {
        ...updateTransactionDto,
      },
    });

    return updatedTransaction;
  }

  public async remove(id: string) {
    await this.transactionsRepository.delete({
      where: {
        id,
      },
    });
  }
}
