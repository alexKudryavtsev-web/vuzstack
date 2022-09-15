import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleResponseInterface } from './types/ArticleResponse.interface';

@Injectable({})
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async readArticleById(articleId: number): Promise<ArticleResponseInterface> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });

    return {
      article,
    };
  }
}
