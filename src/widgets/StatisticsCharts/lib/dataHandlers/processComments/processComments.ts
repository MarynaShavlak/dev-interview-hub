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
    console.log('_articles', articles);
    console.log('_comments', comments);
    const ids = comments.map((comment) => comment.articleId);
    console.log('_ids', ids);
    const artcilesid = articles.map((comment) => comment.id);
    console.log('_artcilesid', artcilesid);
    const a = articles.find((art) => art.id === '1');
    console.log('a', a);
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
    console.log('_commentCountsByArticle', commentCountsByArticle);

    data.articleCommentCounts = Object.keys(commentCountsByArticle)
        .map((articleId) => {
            // console.log('articleId', articleId);
            const article = articles.find((art) => art.id === articleId);
            // console.log('article', article);
            return {
                articleId,
                articleTitle: article?.title || 'Unknown Title',
                commentCount: commentCountsByArticle[articleId],
            };
        })
        .sort((a, b) => b.commentCount - a.commentCount);
};
