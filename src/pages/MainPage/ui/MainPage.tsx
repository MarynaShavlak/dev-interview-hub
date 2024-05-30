import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Rating } from '@/entities/Rating';
import { Page } from '@/widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Головна сторінка')}
            <Rating
                title="Your review"
                hasFeedback
            />
        </Page>
    );
});

export default MainPage;
