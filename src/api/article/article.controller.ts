import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResponseInterface } from './types/ArticleResponse.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleSerivce: ArticleService) {}

  @Get(':id')
  async readArticleById(
    @Param('id') articleId: number,
  ): Promise<ArticleResponseInterface> {
    return await this.articleSerivce.readArticleById(articleId);
  }
}
