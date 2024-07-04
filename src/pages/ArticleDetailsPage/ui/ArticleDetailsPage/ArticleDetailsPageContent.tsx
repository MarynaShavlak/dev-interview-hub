import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import cls from './ArticleDetailsPage.module.scss';

interface renderArticleDetailsPageContentProps {
    isRedesigned: boolean;
    className?: string;
}

export const ArticleDetailsPageContent = (
    props: renderArticleDetailsPageContentProps,
) => {
    const { isRedesigned, className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article-details');
    const message = t('Стаття не доступна');

    if (!id) {
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={message} variant="error" size="l" />}
                    off={
                        <TextDeprecated
                            text={message}
                            size={TextSize.L}
                            theme={TextTheme.ERROR}
                        />
                    }
                />
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
                {isRedesigned ? (
                    <DetailsContainer />
                ) : (
                    <ArticleDetailsPageHeader />
                )}
                {!isRedesigned && <ArticleDetails id={id} />}
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </VStack>
        </Page>
    );
};
