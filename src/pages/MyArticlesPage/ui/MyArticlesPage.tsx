import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { useArticlesByUserId } from '@/entities/Article';
import { useUserAuthData } from '@/entities/User';
import { UsersTable as UserArticlesTable } from '@/features/UserArticlesTable';

const MyArticlesPage = memo(() => {
    const { t } = useTranslation('about');
    // const articles = useSelector(selectAllArticles);

    const currentUserdata = useUserAuthData();

    const authedUserId = currentUserdata?.id || '';
    console.log('authedUserId', authedUserId);

    const { data: articles } = useArticlesByUserId(authedUserId);
    console.log('articles', articles);
    if (!articles?.length) {
        return null;
    }

    return (
        <Page data-testid="My Articles Page">
            My articles Page
            <UserArticlesTable />
            {/* <ArticleList */}
            {/*    view={ArticleView.SEQUENCE} */}
            {/*    articlesToRender={articles} */}
            {/*    page={0} */}
            {/* /> */}
        </Page>
    );
});

export default MyArticlesPage;
