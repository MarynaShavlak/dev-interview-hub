import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DisabledRatingBlock } from './DisabledRatingBlock/DisabledRatingBlock';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Rating } from '@/entities/Rating';
import { useUserAuthData } from '@/entities/User';
import { useGetArticleRatingByUserId } from '../../api/articleRatingApi';
import { useArticleRating } from '../../lib/hooks/useArticleRating';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { onSubmitRating, onSubmitFeedback } = useArticleRating(articleId);
    const userData = useUserAuthData();
    const { data, error, isLoading } = useGetArticleRatingByUserId({
        articleId,
        userId: userData?.id ?? '',
    });
    const rating = data?.[0];
    console.log('____rating', rating);
    const { t } = useTranslation();

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    if (error) return null;
    // if (!rating) return null;
    if (isLoading) {
        return <Skeleton width="100%" height={120} border="40px" />;
    }

    return (
        <ToggleFeaturesComponent
            feature="isArticleRatingEnabled"
            on={
                <Rating
                    onSubmitRating={onSubmitRating}
                    onSubmitFeedback={onSubmitFeedback}
                    rate={rating?.rate}
                    className={className}
                    title={t('Оцініть статтю')}
                    feedbackTitle={t(
                        'Залишіть свій відгук про статтю, це допоможе покращити якість',
                    )}
                    hasFeedback
                />
            }
            off={<DisabledRatingBlock />}
        />
    );
});

export default ArticleRating;
