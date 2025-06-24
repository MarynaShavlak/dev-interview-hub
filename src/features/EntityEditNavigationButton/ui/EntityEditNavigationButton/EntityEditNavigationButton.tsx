import { memo } from 'react';
import { EntityType } from '@/shared/types/entityType';
import { HRInterviewQAEditButton } from '@/entities/HRInterviewQA';
import { LiveCodeEditButton } from '@/entities/LiveCode';
import { ArticleEditButton } from '@/entities/Article';

interface EntityEditNavigationButtonProps {
    id: string;
    entityType: EntityType;
    max?: boolean;
}

export const EntityEditNavigationButton = memo(
    ({ id, entityType, max = false }: EntityEditNavigationButtonProps) => {
        switch (entityType) {
            case 'article':
                return <ArticleEditButton id={id} max={max} />;
            case 'liveCode':
                return <LiveCodeEditButton id={id} max={max} />;
            case 'hrInterviewQA':
                return <HRInterviewQAEditButton id={id} max={max} />;
            default:
                return null;
        }
    },
);
