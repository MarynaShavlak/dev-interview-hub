import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { MyArticlesPageContent } from './MyArticlesPageContent/MyArticlesPageContent';

const MyArticlesPage = memo(() => {
    return (
        <Page data-testid="My Articles Page">
            <MyArticlesPageContent />
        </Page>
    );
});

export default MyArticlesPage;
