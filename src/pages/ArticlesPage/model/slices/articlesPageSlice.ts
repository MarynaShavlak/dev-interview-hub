import { createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import {
    Article,
    ArticleCategory,
    ArticleSortType,
    ArticleView,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { ArticlesPageSchema } from '../..';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { StateSchema } from '@/app/providers/StoreProvider';
import { defaultSort } from '../consts/defaultValues';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const initialState: ArticlesPageSchema =
    articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        view: ArticleView.GRID,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: defaultSort,
        search: '',
        order: 'asc',
        category: ArticleCategory.ALL,
        scrollStopArticleIndex: 0,
        //
        ids: [],
        entities: {},
    });

const articlesPageSlice = buildSlice({
    name: 'articlesPageSlice',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortType>) => {
            state.sort = action.payload;
        },
        setCategory: (state, action: PayloadAction<ArticleCategory>) => {
            state.category = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setScrollStopArticleIndex: (state, action: PayloadAction<number>) => {
            state.scrollStopArticleIndex = action.payload;
        },
        initState: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;

            state.limit =
                // eslint-disable-next-line no-nested-ternary
                action.payload === ArticleView.GRID
                    ? 9
                    : action.payload === ArticleView.LIST
                      ? 4
                      : 20;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;

                state.hasMore = action.payload.length >= state.limit;
                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload);
                } else {
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
    useActions: useArticlesPageActions,
} = articlesPageSlice;

// extraReducers: (builder) => {
//     builder
//         .addCase(fetchArticlesList.pending, (state, action) => {
//             state.error = undefined;
//             state.isLoading = true;
//             if (action.meta.arg.replace) {
//                 articlesAdapter.removeAll(state);
//             }
//         })
//         .addCase(fetchArticlesList.fulfilled, (state, action) => {
//             state.isLoading = false;
//
//             state.hasMore = action.payload.length >= state.limit;
//             if (action.meta.arg.replace) {
//                 articlesAdapter.setAll(state, action.payload);
//             } else {
//                 articlesAdapter.addMany(state, action.payload);
//             }
//         })
//         .addCase(fetchArticlesList.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         });
// },
