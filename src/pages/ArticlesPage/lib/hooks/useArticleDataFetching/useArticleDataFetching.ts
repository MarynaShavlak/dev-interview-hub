import { useCallback } from 'react';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesListThunk } from '../../../model/services/fetchArticlesListThunk/fetchArticlesListThunk';
import { shouldDoActionForRedesignUi } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const useArticleDataFetching = () => {
    const dispatch = useAppDispatch();
    const shouldFetchData = shouldDoActionForRedesignUi();

    const fetchData = useCallback(async () => {
        if (shouldFetchData) {
            await dispatch(fetchArticlesListThunk({ replace: true }));
        }
    }, [dispatch, shouldFetchData]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    return {
        fetchData,
        debouncedFetchData,
        shouldFetchData,
    };
};
