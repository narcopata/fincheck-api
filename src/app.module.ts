import { Module } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { UsersModule } from './modules/users/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule, CategoriesModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
