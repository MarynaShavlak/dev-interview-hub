import React, { memo } from 'react';
import { Page } from '@/widgets/Page';

import { HRInterviewQAEditorPageContainer } from '../HRInterviewQAEditorPageContainer/HRInterviewQAEditorPageContainer';

interface ArticleEditorPageProps {
    className?: string;
}

const ArticleEditorPage = memo((props: ArticleEditorPageProps) => {
    const { className } = props;

    return (
        <Page className={className}>
            <HRInterviewQAEditorPageContainer />
        </Page>
    );
});

export default ArticleEditorPage;
