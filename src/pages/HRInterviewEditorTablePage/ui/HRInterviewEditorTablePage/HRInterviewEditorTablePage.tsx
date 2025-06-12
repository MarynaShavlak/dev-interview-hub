import React, { memo } from 'react';

import { UserHRInterviewTable } from '@/widgets/UserHRInterviewTable';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteHRInterviewQAThunk } from '@/entities/HRInterviewQA';

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
    return <UserHRInterviewTable onDeleteArticle={handleDeleteArticle} />;
};

export default memo(HRInterviewEditorTablePage);
