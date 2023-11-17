import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';

@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    TransactionsRepository,
    BankAccountsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    TransactionsRepository,
    BankAccountsRepository,
  ],
})
export class DatabaseModule {}
