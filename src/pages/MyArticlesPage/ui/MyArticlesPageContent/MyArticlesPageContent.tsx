import React, { memo } from 'react';
import { QuestionsQueue } from '@/features/QuestionsQueue';
import { UserArticlesTable } from '@/widgets/UserArticlesTable';
import { deleteArticleWithRelationsThunk } from '@/widgets/ArticleManagement';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocalStorage } from '@/shared/lib/hooks/useLocalStorage/useLocalStorage';
import { MY_ARTICLES_TAB_KEY } from '@/shared/const/localstorage';

import { VStack } from '@/shared/ui/common/Stack';
import { MyArticlesTabsNavigation } from '../MyArticlesTabsNavigation/MyArticlesTabsNavigation';
import { MyArticlesTabType } from '../../model/types/myArticlesTabTypes';

export const MyArticlesPageContent = memo(() => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useLocalStorage<MyArticlesTabType>(
        MY_ARTICLES_TAB_KEY,
        'ready',
    );

    const handleDeleteArticle = async (articleId: string) => {
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
    };

    return (
        <VStack gap="24">
            <MyArticlesTabsNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            {activeTab === 'ready' ? (
                <UserArticlesTable onDeleteArticle={handleDeleteArticle} />
            ) : (
                <>
                    <QuestionsQueue />
                    {/* <LinksManager /> */}
                </>
            )}
        </VStack>
    );
});
