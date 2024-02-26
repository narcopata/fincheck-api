import { argon2id, hash, verify } from 'argon2';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessToken(sub: string) {
    return this.jwtService.signAsync(
      {
        sub,
      },
      {
        secret: env.jwtSecret,
      },
    );
  }

  public async signin({ email, password }: SignInDto) {
    const user = await this.usersRepository.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    console.log(argon2id);

    const isPasswordValid = await verify(user.password, password, ({
      type: argon2id,
      hashLength: 40,
    } as unknown as { secret: any }));

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  public async signup(signupDto: SignUpDto) {
    const userWithEmailFromDb = await this.usersRepository.findUnique({
      where: {
        email: signupDto.email,
      },
    });

    if (userWithEmailFromDb) {
      throw new ConflictException(
        'Um usuário com este email já está cadastrado.',
      );
    }

    const hashedPassword = await hash(signupDto.password, {
      type: argon2id,
      hashLength: 40,
    });

    const user = await this.usersRepository.create({
      data: {
        ...signupDto,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'salary', type: 'income' },
              {
                name: 'Freelance',
                icon: 'freelance',
                type: 'income',
              },
              { name: 'Outro', icon: 'other', type: 'income' },
              { name: 'Casa', icon: 'home', type: 'expense' },
              { name: 'Alimentação', icon: 'food', type: 'expense' },
              {
                name: 'Educação',
                icon: 'education',
                type: 'expense',
              },
              { name: 'Lazer', icon: 'fun', type: 'expense' },
              { name: 'Mercado', icon: 'grocery', type: 'expense' },
              { name: 'Roupas', icon: 'clothes', type: 'expense' },
              {
                name: 'Transporte',
                icon: 'transport',
                type: 'expense',
              },
              { name: 'Viagem', icon: 'travel', type: 'expense' },
              { name: 'Outro', icon: 'other', type: 'expense' },
            ],
          },
        },
      },
      include: {
        categories: {
          select: {
            type: true,
            name: true,
            icon: true,
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }
}
