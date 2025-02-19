import { ArticlesRouteState } from '../../../model/types/articlesFiltersTypes';

export const getCategorySlug = (name: string) => {
    return name.split(' ').map(encodeURIComponent).join('-');
};

export const getCategoryName = (slug: string) => {
    return slug.split('-').map(decodeURIComponent).join(' ');
};

export const getCategoryFromUrl = (routeState: ArticlesRouteState) => {
    if (routeState.category === 'ALL') {
        return [];
    }

    if (routeState.category) {
        return routeState.category.split('-').map(getCategoryName);
    }

    return [];
};
