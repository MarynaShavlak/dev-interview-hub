import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getArticleViewData,
    shouldCountView,
} from '../../utilities/calculateViews/calculateViews';
import { updateArticleViewsThunk } from '../../../model/services/updateArticleViewsThunk/updateArticleViewsThunk';
import { Article } from '../../../model/types/article';

interface UseArticleViewsProps {
    id?: string;
    article?: Article;
    isLoading?: boolean;
}

export const useUpdateArticleViews = ({
    id,
    article,
    isLoading,
}: UseArticleViewsProps) => {
    const dispatch = useAppDispatch();
    const hasTrackedView = useRef(false);

    useEffect(() => {
        if (!id || !article || isLoading || hasTrackedView.current) return;

        const viewData = getArticleViewData(id);
        const needUpdate = shouldCountView(viewData);

        if (needUpdate) {
            hasTrackedView.current = true;
            dispatch(updateArticleViewsThunk(article));
        }
    }, [id, article, dispatch, isLoading]);

    return {
        hasTrackedView: hasTrackedView.current,
    };
};
