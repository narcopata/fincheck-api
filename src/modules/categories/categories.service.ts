import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async findAllByUserId(userId: string) {
    return await this.categoriesRepository.findMany({
      where: {
        userId,
      },
    });
  }
}
