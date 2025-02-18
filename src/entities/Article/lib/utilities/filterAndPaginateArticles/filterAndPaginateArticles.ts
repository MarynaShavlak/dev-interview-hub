import { getPaginationIndices } from '../getPaginationIndices/getPaginationIndices';
import { Article } from '../../../model/types/article';

interface FilterAndPaginateArticlesArgs {
    page: number;
    limit: number;
    articles: Article[];
    query: string;
}

export const filterAndPaginateArticles = ({
    page,
    limit,
    articles,
    query,
}: FilterAndPaginateArticlesArgs): Article[] => {
    const { startIndex, endIndex } = getPaginationIndices({ page, limit });

    if (query.trim()) {
        return articles
            .filter(
                (article) =>
                    article.title.toLowerCase().includes(query.toLowerCase()) ||
                    (article.subtitle &&
                        article.subtitle.text
                            .toLowerCase()
                            .includes(query.toLowerCase())),
            )
            .slice(startIndex, endIndex);
    }

    return articles.slice(startIndex, endIndex);
};
