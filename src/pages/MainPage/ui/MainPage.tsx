import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Головна сторінка')}
        </Page>
    );
});

export default MainPage;
