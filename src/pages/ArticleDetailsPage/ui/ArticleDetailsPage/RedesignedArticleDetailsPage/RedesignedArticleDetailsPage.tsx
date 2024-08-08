import { memo } from 'react';
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer';
import cls from '../ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { ArticleDetailsPageContainer } from '../ArticleDetailsPageContainer/ArticleDetailsPageContainer';

export const RedesignedArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        return (
            <StickyContentLayout
                left={<ArticleListNavigationButton />}
                content={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <ArticleDetailsPageContainer />
                    </Page>
                }
                right={<AdditionalInfoContainer />}
            />
        );
    },
);
