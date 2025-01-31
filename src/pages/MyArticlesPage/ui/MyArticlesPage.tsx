import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UserArticlesTable } from '@/widgets/UserArticlesTable';
import { Page } from '@/widgets/Page';
import { useUserAuthData } from '@/entities/User';
import { useArticlesByUserId } from '@/entities/Article';
import { deleteArticleWithRelationsThunk } from '@/widgets/ArticleManagement';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const MyArticlesPage = memo(() => {
    const { t } = useTranslation('about');
    const dispatch = useAppDispatch();

    const currentUserdata = useUserAuthData();

    const authedUserId = currentUserdata?.id || '';

    const { data: articles } = useArticlesByUserId(authedUserId);
    const handleDeleteArticle = useCallback(
        async (articleId: string) => {
            try {
                const deletedArticleId = await dispatch(
                    deleteArticleWithRelationsThunk(articleId),
                ).unwrap();
                await searchClient.clearCache();
                return deletedArticleId;
            } catch (error) {
                console.error('Error deleting article:', error);
                return null;
            }
        },
        [dispatch],
    );

    if (!articles?.length) {
        return null;
    }

    return (
        <Page data-testid="My Articles Page">
            <UserArticlesTable onDeleteArticle={handleDeleteArticle} />
        </Page>
    );
});

export default MyArticlesPage;
