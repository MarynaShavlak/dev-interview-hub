import { getPaginationIndices } from '../getPaginationIndices/getPaginationIndices';
import { Article } from '../../..';

interface FilterAndPaginateArticlesArgs {
    page: number;
    limit: number;
    articles: Article[];
    search: string;
}

export const filterAndPaginateArticles = ({
    page,
    limit,
    articles,
    search,
}: FilterAndPaginateArticlesArgs): Article[] => {
    const { startIndex, endIndex } = getPaginationIndices({ page, limit });

    if (search.trim()) {
        return articles
            .filter(
                (article) =>
                    article.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    (article.subtitle &&
                        article.subtitle.text
                            .toLowerCase()
                            .includes(search.toLowerCase())),
            )
            .slice(startIndex, endIndex);
    }

    return articles.slice(startIndex, endIndex);
};
