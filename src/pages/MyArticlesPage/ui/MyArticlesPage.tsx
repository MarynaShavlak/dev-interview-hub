import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import {
    ArticleList,
    ArticleView,
    selectAllArticles,
} from '@/entities/Article';

const MyArticlesPage = memo(() => {
    const { t } = useTranslation('about');
    const articles = useSelector(selectAllArticles);
    console.log('articles', articles);

    return (
        <Page data-testid="My Articles Page">
            My articles Page
            <ArticleList
                view={ArticleView.SEQUENCE}
                articlesToRender={articles}
                page={0}
            />
        </Page>
    );
});

export default MyArticlesPage;
