import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DatabaseModule } from '../../shared/database/database.module';
import { AssertTransactionUserRelationService } from './services/assert-transaction-user-relation.service';
import { AssertBankAccountUserRelationService } from '../bank-accounts/services/assert-bank-account-user-relation.service';
import { AssertCategoryUserRelationService } from '../categories/services/assert-category-user-relation.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    AssertBankAccountUserRelationService,
    AssertCategoryUserRelationService,
    AssertTransactionUserRelationService,
  ],
  exports: [AssertTransactionUserRelationService],
})
export class TransactionsModule {}
