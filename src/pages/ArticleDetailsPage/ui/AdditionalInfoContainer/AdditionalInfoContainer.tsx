import { memo } from 'react';
import { AdditionalInfoContainerSkeleton } from './AdditionalInfoContainerSkeleton';
import {
    useArticleDetailsIsLoading,
    useArticleDetailsData,
} from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import cls from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
    const article = useArticleDetailsData();
    const isLoading = useArticleDetailsIsLoading();

    if (isLoading) {
        return <AdditionalInfoContainerSkeleton />;
    }

    if (!article) {
        return null;
    }
    return (
        <Card padding="24" border="round" className={cls.card}>
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
});
