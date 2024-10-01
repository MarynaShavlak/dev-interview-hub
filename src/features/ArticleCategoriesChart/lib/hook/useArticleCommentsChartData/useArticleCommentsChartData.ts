import { useMemo } from 'react';
import { useArticlesComments } from '../../../api/articlesCommentsApi';

export interface CategoryData {
    [category: string]: number;
}
export const useArticleCommentsChartData = () => {
    const { data: comments, isLoading } = useArticlesComments(null);

    const { commentsLabels, commentsData } = useMemo(() => {
        const articleCommentCount: CategoryData = {};

        comments?.forEach((comment) => {
            const { articleId } = comment;
            if (articleCommentCount[articleId]) {
                articleCommentCount[articleId] += 1;
            } else {
                articleCommentCount[articleId] = 1;
            }
        });

        const resultArray = Object.entries(articleCommentCount)
            .map(([articleId, comments]) => {
                return { articleId, comments };
            })
            .sort((a, b) => b.comments - a.comments);

        const commentsLabels = resultArray.map((item) => item.articleId);
        const commentsData = resultArray.map((item) => item.comments);

        return { commentsLabels, commentsData };
    }, [comments]);

    return { isLoading, commentsLabels, commentsData };
};
