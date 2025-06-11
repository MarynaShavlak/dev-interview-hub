import React, { memo } from 'react';

import { UserHRInterviewTable } from '@/widgets/UserHRInterviewTable';

const HRInterviewEditorTablePage = () => {
    const handleDeleteArticle = async (articleId: string) => {
        try {
            console.log('deleteArticle:', articleId);
            return articleId;
            // const deletedArticleId = await dispatch(
            //     deleteArticleWithRelationsThunk(articleId),
            // ).unwrap();
            // await searchClient.clearCache();
            // return deletedArticleId;
        } catch (error) {
            console.error('Error deleting article:', error);
            return null;
        }
    };
    return <UserHRInterviewTable onDeleteArticle={handleDeleteArticle} />;
};

export default memo(HRInterviewEditorTablePage);
// <ToggleFeaturesComponent
//     feature="isAppRedesigned"
//     on={<QuestionsQueue type="hrInterviewQA" />}
//     off={
//         <Page>
//             <QuestionsQueue type="hrInterviewQA" />
//         </Page>
//     }
// />
