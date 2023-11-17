import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { AssertBankAccountUserRelationService } from '../bank-accounts/services/assert-bank-account-user-relation.service';
import { AssertTransactionUserRelationService } from './services/assert-transaction-user-relation.service';
import { AssertCategoryUserRelationService } from '../categories/services/assert-category-user-relation.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  public async findAllByUserId() {
    return this.transactionsRepository.findMany({});
  }

  public async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const { categoryId, bankAccountId, date, name, type, value } =
      createTransactionDto;

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
    this.transactionsRepository.delete({
      where: {
        id,
      },
    });
  }
}
