import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class AssertTransactionUserRelationService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  public async assert(id: string, userId: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
        userId,
      },
      select: {
        userId: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada.');
    }
  }
}
