import { memo } from 'react';
import { AdditionalInfoContainerSkeleton } from './AdditionalInfoContainerSkeleton/AdditionalInfoContainerSkeleton';
// import {
//     useArticleDetailsIsLoading,
//     useArticleDetailsData,
// } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from './AdditionalInfoContainer.module.scss';
import { useArticleDataById } from '@/entities/Article';
import { EntityControls } from '@/widgets/EntityControls';

interface ArticleDetailsPageContainerProps {
    id: string;
}

export const AdditionalInfoContainer = memo(
    ({ id }: ArticleDetailsPageContainerProps) => {
        const { data: article, isLoading, error } = useArticleDataById(id);
        // const article = useArticleDetailsData();
        // const isLoading = useArticleDetailsIsLoading();

        if (isLoading) {
            return <AdditionalInfoContainerSkeleton />;
        }

        if (!article) {
            return null;
        }
        return (
            <Card padding="24" border="round" className={cls.card}>
                <EntityControls entity={article} entityType="article" />
            </Card>
        );
    },
);
