import React, { memo } from 'react';
import { Page } from '@/widgets/Page';

import { ArticleEditorPageContainer } from '../ArticleEditorPageContainer/ArticleEditorPageContainer';

interface ArticleEditorPageProps {
    className?: string;
}

const ArticleEditorPage = memo((props: ArticleEditorPageProps) => {
    const { className } = props;

    return (
        <Page className={className}>
            <ArticleEditorPageContainer />
        </Page>
    );
});

export default ArticleEditorPage;
