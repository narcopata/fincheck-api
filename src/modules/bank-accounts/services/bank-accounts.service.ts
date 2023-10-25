import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../../shared/database/repositories/bank-accounts.repositories';
import { AssertBankAccountUserRelationService } from './assert-bank-account-user-relation.service';

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
    return this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
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
