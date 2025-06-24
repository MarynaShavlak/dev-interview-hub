import { memo } from 'react';
import { AdditionalInfoContainerSkeleton } from './AdditionalInfoContainerSkeleton/AdditionalInfoContainerSkeleton';
// import {
//     useArticleDetailsIsLoading,
//     useArticleDetailsData,
// } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import cls from './AdditionalInfoContainer.module.scss';
import { EntityControls } from '@/widgets/EntityControls';
import { useLiveCodeDataById } from '@/entities/LiveCode';

interface ArticleDetailsPageContainerProps {
    id: string;
}

export const AdditionalInfoContainer = memo(
    ({ id }: ArticleDetailsPageContainerProps) => {
        const {
            data: liveCodeTask,
            isLoading,
            error,
        } = useLiveCodeDataById(id);

        if (isLoading) {
            return <AdditionalInfoContainerSkeleton />;
        }

        if (!liveCodeTask) {
            return null;
        }
        return (
            <Card padding="24" border="round" className={cls.card}>
                <EntityControls entity={liveCodeTask} entityType="liveCode" />
                {/* <ArticleControls article={article} /> */}
            </Card>
        );
    },
);
