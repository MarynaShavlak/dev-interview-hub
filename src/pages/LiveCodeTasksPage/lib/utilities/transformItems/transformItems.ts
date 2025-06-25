import { useHits } from 'react-instantsearch-core';
import { LiveCode } from '@/entities/LiveCode';

type HitsItems = ReturnType<typeof useHits>['items'];

export const transformItems = (items: HitsItems): LiveCode[] => {
    return items.map((item) => {
        const { category, id, title, user, createdAt, blocks } = item;
        return {
            category,
            id,
            title,
            user,
            createdAt,
            blocks,
        };
    });
};
