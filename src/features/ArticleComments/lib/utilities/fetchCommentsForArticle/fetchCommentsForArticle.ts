import { createArticleCommentsQuery } from '../createArticleCommentsQuery/createArticleCommentsQuery';
import { fetchQueryResults } from '@/shared/lib/firestore/fetchQueryResults/fetchQueryResults';
import { ArticleComment } from '../../../model/types/articleComment';

export const fetchCommentsForArticle = async (articleId: string) => {
    const commentsQuery = createArticleCommentsQuery(articleId);

    const comments = await fetchQueryResults<ArticleComment>(commentsQuery);
    return comments;
};
