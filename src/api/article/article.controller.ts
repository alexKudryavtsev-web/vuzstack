import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from '@app/api/article/article.service';
import { ArticleResponseInterface } from '@app/api/article/interfaces/ArticleResponse.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  async readArticleById(
    @Param('id') id: number,
  ): Promise<ArticleResponseInterface> {
    return await this.articleService.readArticleById(id);
  }
}
