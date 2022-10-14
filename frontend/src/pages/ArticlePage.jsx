import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import ArticleService from '../services/ArticleService';

const CONTENT_FOR_404_ERROR = `
### Статья не найдена
`;

function ArticlePage() {
  const [markdown, setMarkdown] = useState('');
  const { id } = useParams();

  const fetchArticle = useCallback(async () => {
    try {
      const response = await ArticleService.readArticle(id);

      setMarkdown(response.data.article.content);
    } catch (error) {
      setMarkdown(CONTENT_FOR_404_ERROR);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return (
    <article className="prose lg:prose-xl p-5">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  );
}

export default ArticlePage;
