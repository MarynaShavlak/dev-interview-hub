import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Rating } from '@/entities/Rating';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';
import { useUserAuthData } from '@/entities/User';
import { Card } from '@/shared/ui/redesigned/Card';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useUserAuthData();

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                // handle error
                console.log(e);
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    const rating = data?.[0];

    return (
        <ToggleFeaturesComponent
            feature="isArticleRatingEnabled"
            on={
                <Rating
                    onCancel={onCancel}
                    onAccept={onAccept}
                    rate={rating?.rate}
                    className={className}
                    title={t('Оцініть статтю')}
                    feedbackTitle={t(
                        'Залишіть свій відгук про статтю, це допоможе покращити якість',
                    )}
                    hasFeedback
                />
            }
            off={
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Card max border="round">
                            {t("Оцінка статей скоро з'явиться")}
                            <StarRating size={30} disabled />
                        </Card>
                    }
                    off={
                        <CardDeprecated fullWidth>
                            {t("Оцінка статей скоро з'явиться")}
                        </CardDeprecated>
                    }
                />
            }
        />
    );
});

export default ArticleRating;
