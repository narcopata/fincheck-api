import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';

@Module({
  providers: [PrismaService, UsersRepository, CategoriesRepository],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
