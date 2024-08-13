import { StateSchema } from '@/app/providers/StoreProvider';
import {
    ArticleCategory,
    ArticleSortField,
    ArticleView,
} from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';

export const [useArticlesPageIsLoading, getArticlesPageIsLoading] =
    buildSelector(
        (state: StateSchema) => state.articlesPage?.isLoading || false,
    );

export const [useArticlesPageError, getArticlesPageError] = buildSelector(
    (state: StateSchema) => state.articlesPage?.error,
);

export const [useArticlesPageView, getArticlesPageView] = buildSelector(
    (state: StateSchema) => state.articlesPage?.view || ArticleView.GRID,
);

export const [useArticlesPageNum, getArticlesPageNum] = buildSelector(
    (state: StateSchema) => state.articlesPage?.page || 1,
);

export const [useArticlesPageLimit, getArticlesPageLimit] = buildSelector(
    (state: StateSchema) => state.articlesPage?.limit || 9,
);

export const [useArticlesPageHasMore, getArticlesPageHasMore] = buildSelector(
    (state: StateSchema) => state.articlesPage?.hasMore,
);

export const [useArticlesPageInited, getArticlesPageInited] = buildSelector(
    (state: StateSchema) => state.articlesPage?._inited,
);

export const [useArticlesPageOrder, getArticlesPageOrder] = buildSelector(
    (state: StateSchema) => state.articlesPage?.order ?? 'asc',
);

export const [useArticlesPageSort, getArticlesPageSort] = buildSelector(
    (state: StateSchema) =>
        state.articlesPage?.sort || ArticleSortField.CREATED,
);

export const [useArticlesPageSearch, getArticlesPageSearch] = buildSelector(
    (state: StateSchema) => state.articlesPage?.search ?? '',
);

export const [useArticlesPageCategory, getArticlesPageCategory] = buildSelector(
    (state: StateSchema) => state.articlesPage?.category || ArticleCategory.ALL,
);
