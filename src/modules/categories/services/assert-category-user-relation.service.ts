import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class AssertCategoryUserRelationService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async assert(id: string, userId: string) {
    const category = await this.categoriesRepository.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }
  }
}
