import { StatisticsData } from '../../../model/types/stats';
import { ArticleComment } from '../../../../../features/ArticleComments/model/types/articleComment';
import { Article } from '@/entities/Article';

export const processComments = (
    data: StatisticsData,
    comments: ArticleComment[],
    articles: Article[],
) => {
    if (!comments || !articles) return;
    if (articles.length === 0) return;

    const { commentCountsByUser } = data;
    const activeUsersList = data.activeUsersList.inComments;
    const activeArticlesList = data.activeArticlesList.withComments; // Still using Set<string>

    const commentCountsByArticle: { [articleId: string]: number } = {};

    comments.forEach((comment) => {
        const {
            user: { id, username },
            articleId,
        } = comment;

        activeUsersList.add(id);
        activeArticlesList.add(articleId);

        commentCountsByArticle[articleId] =
            (commentCountsByArticle[articleId] || 0) + 1;

        commentCountsByUser[username] =
            (commentCountsByUser[username] || 0) + 1;
    });

    data.articleCommentCounts = Object.keys(commentCountsByArticle)
        .map((articleId) => {
            const article = articles.find((art) => art.id === articleId);
            // console.log('article', article);
            const label = article?.title
                ? // ? truncateText(article.title, 10)
                  article.title
                : 'Unknown Title';
            return {
                articleId,
                articleTitle: label,
                commentCount: commentCountsByArticle[articleId],
            };
        })
        .sort((a, b) => b.commentCount - a.commentCount);
};
