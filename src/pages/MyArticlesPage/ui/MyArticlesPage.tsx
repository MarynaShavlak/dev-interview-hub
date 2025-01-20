import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const MyArticlesPage = memo(() => {
    const { t } = useTranslation('about');

    return <Page data-testid="My Articles Page">My articles Page</Page>;
});

export default MyArticlesPage;
