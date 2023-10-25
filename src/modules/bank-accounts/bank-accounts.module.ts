import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { AssertBankAccountUserRelationService } from './services/assert-bank-account-user-relation.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountsController],
  providers: [BankAccountsService, AssertBankAccountUserRelationService],
  exports: [AssertBankAccountUserRelationService],
})
export class BankAccountsModule {}
