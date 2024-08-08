import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPage/DeprecatedArticleDetailsPage/ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface DetailsContainerProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card
                    max
                    fullHeight
                    border="round"
                    className={className}
                    padding="24"
                >
                    <ArticleDetails id={id} />
                </Card>
            }
            off={
                <>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                </>
            }
        />
    );
});
