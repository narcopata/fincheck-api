import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { DefaultArgs, GetFindResult } from '@prisma/client/runtime/library';

interface ICategoriesRepository
  extends Pick<PrismaService['category'], 'findMany'> {}

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  private readonly categoriesRepository: PrismaService['category'];

  constructor(private readonly prismaService: PrismaService) {
    this.categoriesRepository = this.prismaService.category;
  }

  findMany<T extends Prisma.CategoryFindManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.CategoryFindManyArgs<DefaultArgs>>,
  ): Prisma.PrismaPromise<
    GetFindResult<Prisma.$CategoryPayload<DefaultArgs>, T>[]
  > {
    return this.categoriesRepository.findMany(args);
  }

  findOne(findOneDto: Prisma.CategoryFindUniqueArgs) {
    return this.categoriesRepository.findUnique(findOneDto);
  }
}
