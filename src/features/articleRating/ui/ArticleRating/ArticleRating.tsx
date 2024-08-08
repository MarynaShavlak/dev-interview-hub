import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DisabledRatingBlock } from './DisabledRatingBlock/DisabledRatingBlock';
import { useArticleRating } from '../../lib/hook/useArticleRating';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Rating } from '@/entities/Rating';

export interface ArticleRatingProps {
    className?: string;
    articleId?: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    console.log('articleId in Rating Component', articleId);
    const { rating, isLoading, error, onSubmitFeedback, onSubmitRating } =
        useArticleRating(articleId || '');
    const { t } = useTranslation();

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    if (error) return null;
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
