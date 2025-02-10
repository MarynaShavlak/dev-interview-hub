import { VIEWS_STORAGE_KEY } from '@/shared/const/localstorage';
import { VIEW_COOLDOWN_HOURS } from '../../../model/consts/viewsConts';

export interface ViewTrackingData {
    articleId: string;
    lastViewTimestamp: number;
}

export const getArticleViewData = (
    articleId: string,
): ViewTrackingData | null => {
    const viewsData = localStorage.getItem(VIEWS_STORAGE_KEY);
    if (!viewsData) return null;

    const parsedData = JSON.parse(viewsData);
    return parsedData[articleId] || null;
};

export const shouldCountView = (viewData: ViewTrackingData | null): boolean => {
    if (!viewData) return true;

    const hoursSinceLastView =
        (Date.now() - viewData.lastViewTimestamp) / (1000 * 60 * 60);
    console.log('hoursSinceLastView', hoursSinceLastView);
    return hoursSinceLastView >= VIEW_COOLDOWN_HOURS;
};
