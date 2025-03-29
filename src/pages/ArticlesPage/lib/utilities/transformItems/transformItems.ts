import { useHits } from 'react-instantsearch-core';
import { Article } from '@/entities/Article';

type HitsItems = ReturnType<typeof useHits>['items'];

export const transformItems = (items: HitsItems): Article[] => {
    return items.map((item) => {
        const { category, id, title, subtitle, user, views, createdAt, img } =
            item;
        return {
            category,
            id,
            title,
            subtitle,
            user,
            views,
            createdAt,
            blocks: [],
            img,
        };
    });
};
