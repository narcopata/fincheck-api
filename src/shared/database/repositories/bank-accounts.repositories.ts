import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateBankAccountDto } from 'src/modules/bank-accounts/dto/update-bank-account.dto';
import { DefaultArgs, GetFindResult } from '@prisma/client/runtime/library';

type BankAccountsReporitoryType = Pick<
  PrismaService['bankAccount'],
  'findMany'
>;

@Injectable()
export class BankAccountsRepository implements BankAccountsReporitoryType {
  private readonly bankAccountsRepositories: PrismaService['bankAccount'];

  constructor(private readonly prismaService: PrismaService) {
    this.bankAccountsRepositories = this.prismaService.bankAccount;
  }
  public findMany<T extends Prisma.BankAccountFindManyArgs<DefaultArgs>>(
    findAllDto?: Prisma.SelectSubset<
      T,
      Prisma.BankAccountFindManyArgs<DefaultArgs>
    >,
  ): Prisma.PrismaPromise<
    GetFindResult<Prisma.$BankAccountPayload<DefaultArgs>, T>[]
  > {
    return this.bankAccountsRepositories.findMany(findAllDto);
  }

  public async delete(deleteDto: Prisma.BankAccountDeleteArgs): Promise<void> {
    await this.bankAccountsRepositories.delete(deleteDto);
  }

  public async create(createDto: Prisma.BankAccountCreateArgs) {
    return this.bankAccountsRepositories.create(createDto);
  }

  public async updateOne(
    data: {
      id: string;
      userId: string;
    } & UpdateBankAccountDto,
  ) {
    const { color, initialBalance, name, type, id, userId } = data;

    return this.bankAccountsRepositories.update({
      where: {
        id,
        userId,
      },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  public async findOne(findOneDto: Prisma.BankAccountFindFirstArgs) {
    return this.bankAccountsRepositories.findFirst(findOneDto);
  }
}
