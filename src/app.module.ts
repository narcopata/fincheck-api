import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
