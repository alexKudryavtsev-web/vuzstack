import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '@app/api/article/article.entity';
import { ArticleResponseInterface } from '@app/api/article/interfaces/ArticleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async readArticleById(id: number): Promise<ArticleResponseInterface> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND);
    }

    return {
      article,
    };
  }
}
