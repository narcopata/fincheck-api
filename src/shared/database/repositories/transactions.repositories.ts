import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TransactionsRepository {
  private readonly transactionsRepository: PrismaService['transaction'];

  constructor(private readonly prismaService: PrismaService) {
    this.transactionsRepository = this.prismaService.transaction;
  }

  public async findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return this.transactionsRepository.findMany(findManyDto);
  }

  public async findOne(findOneDto: Prisma.TransactionFindUniqueArgs) {
    return this.transactionsRepository.findUnique(findOneDto);
  }

  create(createDto: Prisma.TransactionCreateArgs) {
    return this.transactionsRepository.create(createDto);
  }

  update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.transactionsRepository.update(updateDto);
  }

  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this.transactionsRepository.delete(deleteDto);
  }
}
