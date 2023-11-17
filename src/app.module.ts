import { Module } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { UsersModule } from './modules/users/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { APP_GUARD } from '@nestjs/core';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [UsersModule, CategoriesModule, AuthModule, BankAccountsModule, TransactionsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
