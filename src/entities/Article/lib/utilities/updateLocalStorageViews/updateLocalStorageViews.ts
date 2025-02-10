import { VIEWS_STORAGE_KEY } from '@/shared/const/localstorage';

export const updateLocalStorageViews = (articleId: string) => {
    const viewsData = JSON.parse(
        localStorage.getItem(VIEWS_STORAGE_KEY) || '{}',
    );

    viewsData[articleId] = {
        articleId,
        lastViewTimestamp: Date.now(),
    };

    localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(viewsData));
};
