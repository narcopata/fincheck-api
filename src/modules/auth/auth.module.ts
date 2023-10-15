import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: env.jwtSignExpiresIn },
    }),
  ],
})
export class AuthModule {}
