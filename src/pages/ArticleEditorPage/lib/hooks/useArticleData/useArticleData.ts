import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Article, getArticleDataByIdQuery } from '@/entities/Article';

export const useArticleData = (id: string | undefined) => {
    const dispatch = useAppDispatch();
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        dispatch(getArticleDataByIdQuery(id))
            .unwrap()
            .then(setArticle)
            .catch(() => setArticle(undefined))
            .finally(() => setIsLoading(false));
    }, [id, dispatch]);

    return { article, isLoading };
};
