import React, { memo } from 'react';

import { UserHRInterviewTable } from '@/widgets/UserHRInterviewTable';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteHRInterviewQAThunk } from '@/entities/HRInterviewQA';
import { Page } from '@/widgets/Page';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

const HRInterviewEditorTablePage = () => {
    const dispatch = useAppDispatch();
    const handleDeleteArticle = async (articleId: string) => {
        try {
            const deletedArticleId = await dispatch(
                deleteHRInterviewQAThunk(articleId),
            ).unwrap();
            await searchClient.clearCache();
            return deletedArticleId;
        } catch (error) {
            console.error('Error deleting article:', error);
            return null;
        }
    };
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<UserHRInterviewTable onDeleteArticle={handleDeleteArticle} />}
            off={
                <Page>
                    <UserHRInterviewTable
                        onDeleteArticle={handleDeleteArticle}
                    />
                </Page>
            }
        />
    );
};

export default memo(HRInterviewEditorTablePage);
