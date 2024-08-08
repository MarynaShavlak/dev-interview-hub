import { memo } from 'react';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageContainer } from '../ArticleDetailsPageContainer/ArticleDetailsPageContainer';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../ArticleDetailsPage.module.scss';

export const DeprecatedArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ArticleDetailsPageContainer />
            </Page>
        );
    },
);
