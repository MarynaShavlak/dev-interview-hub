import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AdditionalInfoContainer } from '../../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments';

import { DetailsContainer } from '../../DetailsContainer/DetailsContainer';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from '../ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

export const RedesignedArticleDetailsPage = memo(
    ({ className }: ArticleDetailsPageProps) => {
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation('article-details');

        if (!id) {
            return (
                <Page
                    className={classNames(cls.ArticleDetailsPage, {}, [
                        className,
                    ])}
                >
                    <Text
                        text={t('Стаття не доступна')}
                        variant="error"
                        size="l"
                    />
                </Page>
            );
        }

        return (
            <StickyContentLayout
                left={<ArticleListNavigationButton />}
                content={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <DetailsContainer />
                            <ArticleRating articleId={id} />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
                right={<AdditionalInfoContainer />}
            />
        );
    },
);
