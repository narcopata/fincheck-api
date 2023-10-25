import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class AssertBankAccountUserRelationService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  public async assert(id: string, userId: string) {
    const bankAccount = await this.bankAccountsRepository.findOne({
      where: {
        id,
        userId,
      },
      select: {
        userId: true,
      },
    });

    if (!bankAccount) {
      throw new NotFoundException('Conta bancária não encontrada.');
    }
  }
}
