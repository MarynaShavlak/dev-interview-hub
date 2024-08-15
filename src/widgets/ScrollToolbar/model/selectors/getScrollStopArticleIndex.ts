import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollStopArticleIndex = (state: StateSchema) =>
    state.scrollToolbar.scrollStopArticleIndex;

export const getLastVisibleArticleIndex = (state: StateSchema) =>
    state.scrollToolbar.lastVisibleArticleIndex;
