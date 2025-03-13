import { articlesNormalizedData } from '@/entities/Article/testing';
import { ArticleView } from '@/entities/Article';

export { articlesPageReducer } from './model/slices/articlesPageSlice';

export const baseArgs = {
    articlesPage: {
        ...articlesNormalizedData,
        view: ArticleView.GRID,
        isLoading: false,
    },
};
export const emptyArgs = {
    articlesPage: {
        ids: [],
        entities: {},
        view: ArticleView.GRID,
        isLoading: false,
        _inited: true,
    },
};

export const firstVisitData = {
    ...baseArgs,
    user: {
        authData: {
            id: '2CuQOzOQ9YeU7bFzncJh8YwGZGI2',
            jsonSettings: { isArticlesPageWasOpened: false },
        },
    },
};

export const notFirstVisitData = {
    ...baseArgs,
    user: {
        authData: { jsonSettings: { isArticlesPageWasOpened: true } },
    },
};
