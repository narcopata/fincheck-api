import { Module } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import { UsersModule } from './modules/users/users/users.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
