import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';

@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
