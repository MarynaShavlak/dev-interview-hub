import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageProps } from '../ArticleDetailsPage';
import cls from '../ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';

export const DeprecatedArticleDetailsPage = memo(
    (props: ArticleDetailsPageProps) => {
        const { className } = props;
        const { id } = useParams<{ id: string }>();
        const { t } = useTranslation('article-details');

        if (!id) {
            return (
                <Page
                    className={classNames(cls.ArticleDetailsPage, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated
                        text={t('Стаття не доступна')}
                        size={TextSize.L}
                        theme={TextTheme.ERROR}
                    />
                </Page>
            );
        }
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRating articleId={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        );
    },
);
