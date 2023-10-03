import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { DefaultArgs, GetFindResult } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';

interface IUsersRepository
  extends Pick<PrismaService['user'], 'create' | 'findUnique'> {}

@Injectable()
export class UsersRepository implements IUsersRepository {
  private readonly usersRepository: PrismaService['user'];

  constructor(private readonly prismaUsersRepository: PrismaService) {
    this.usersRepository = this.prismaUsersRepository.user;
  }

  findUnique<T extends Prisma.UserFindUniqueArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs<DefaultArgs>>,
  ): Prisma.Prisma__UserClient<
    GetFindResult<Prisma.$UserPayload<DefaultArgs>, T>,
    null,
    DefaultArgs
  > {
    return this.usersRepository.findUnique(args);
  }

  create<T extends Prisma.UserCreateArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs<DefaultArgs>>,
  ): Prisma.Prisma__UserClient<
    GetFindResult<Prisma.$UserPayload<DefaultArgs>, T>,
    never,
    DefaultArgs
  > {
    return this.usersRepository.create(args);
  }
}
