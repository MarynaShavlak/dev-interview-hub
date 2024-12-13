import { memo } from 'react';
import { useParams } from 'react-router-dom';
import cls from '../ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { ArticleDetailsPageContainer } from '../ArticleDetailsPageContainer/ArticleDetailsPageContainer';
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer';

export const RedesignedArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();
        if (!id) return null;
        return (
            <StickyContentLayout
                left={<ArticleListNavigationButton />}
                content={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <ArticleDetailsPageContainer id={id} />
                    </Page>
                }
                right={<AdditionalInfoContainer id={id} />}
            />
        );
    },
);
