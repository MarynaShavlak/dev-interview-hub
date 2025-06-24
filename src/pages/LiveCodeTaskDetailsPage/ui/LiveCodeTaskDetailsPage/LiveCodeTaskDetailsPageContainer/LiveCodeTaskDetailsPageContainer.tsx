import { memo } from 'react';
import { VStack } from '@/shared/ui/common/Stack';

// import { ArticleComments } from '@/features/ArticleComments';
// import { ArticleRating } from '@/features/ArticleRating';
import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { LiveCodeTaskDetails, useLiveCodeDataById } from '@/entities/LiveCode';
import { EntityControls } from '@/widgets/EntityControls';
// import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';

interface LiveCodeTaskDetailsPageContainerProps {
    id: string;
}

export const LiveCodeTaskDetailsPageContainer = memo(
    ({ id }: LiveCodeTaskDetailsPageContainerProps) => {
        const { data: liveCodeTask } = useLiveCodeDataById(id);

        if (!id || !liveCodeTask) return null;

        return (
            <VStack gap="16" max>
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <Card fullHeight border="round" padding="24" max>
                            <LiveCodeTaskDetails id={id} />
                        </Card>
                    }
                    off={
                        <>
                            <EntityControls
                                entity={liveCodeTask}
                                entityType="liveCode"
                            />
                            <LiveCodeTaskDetails id={id} />
                        </>
                    }
                />
            </VStack>
        );
    },
);
