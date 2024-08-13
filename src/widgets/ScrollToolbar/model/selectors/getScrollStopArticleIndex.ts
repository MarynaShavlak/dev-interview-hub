import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollStopArticleIndex = (state: StateSchema) =>
    state.scrollToolbar.scrollStopArticleIndex || 0;
