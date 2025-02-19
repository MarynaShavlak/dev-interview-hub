import { useState, useEffect } from 'react';
import { ArticleSortField } from '@/entities/Article';
import { createAlgoliaIndexNameFromUrl } from '../../utilities/createAlgoliaIndexNameFromUrl/createAlgoliaIndexNameFromUrl';
import { useArticleFilters } from '../useArticleFilters/useArticleFilters';

export const useAlgoliaIndex = () => {
    // const initialIndex = sort.includes('_')
    //     ? (sort as ArticleSortField)
    //     : createAlgoliaIndexNameFromUrl(sort, order);
    // console.log('initialIndex', initialIndex);
    //
    // const [indexName, setIndexName] = useState<ArticleSortField>(initialIndex);
    //
    // useEffect(() => {
    //     if (initialIndex && initialIndex.includes('_')) {
    //         setIndexName(initialIndex as ArticleSortField);
    //     }
    // }, [initialIndex, sort]);
    //
    // return indexName;
    const { sort, order } = useArticleFilters();
    const initialIndex = sort.includes('_')
        ? (sort as ArticleSortField)
        : createAlgoliaIndexNameFromUrl(sort, order);

    const [indexName, setIndexName] = useState<ArticleSortField>(initialIndex);

    useEffect(() => {
        if (initialIndex && initialIndex.includes('_')) {
            setIndexName(initialIndex);
        }
    }, [initialIndex]);

    return indexName;
};
