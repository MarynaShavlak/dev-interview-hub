import React, { memo, useCallback } from 'react';
import { UserArticlesTable } from '@/widgets/UserArticlesTable';
import { Page } from '@/widgets/Page';
import { deleteArticleWithRelationsThunk } from '@/widgets/ArticleManagement';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const MyArticlesPage = memo(() => {
    const dispatch = useAppDispatch();

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

    // if (!articles?.length) {
    //     return null;
    // }

    return (
        <Page data-testid="My Articles Page">
            <UserArticlesTable onDeleteArticle={handleDeleteArticle} />
        </Page>
    );
});

export default MyArticlesPage;
