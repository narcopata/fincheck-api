import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../database/prisma.service';
import { argon2id, hash } from 'argon2';
import { Category, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    const userWithEmailFromDb = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userWithEmailFromDb) {
      throw new ConflictException(
        'Um usuário com este email já está cadastrado.',
      );
    }

    const hashedPassword = await hash(createUserDto.password, {
      type: argon2id,
      hashLength: 40,
    });

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      categories: user.categories,
    } satisfies Partial<
      User & { categories: Pick<Category, 'name' | 'icon' | 'type'>[] }
    >;
  }
}
