import { EntityType } from '@/shared/types/entityType';
import { EntityEditNavigationButton } from '@/features/EntityEditNavigationButton';

export const renderEditButton = (entityType: EntityType, id: string) => {
    switch (entityType) {
        case 'article':
            return (
                <EntityEditNavigationButton id={id} entityType="article" max />
            );
        case 'liveCode':
            return (
                <EntityEditNavigationButton id={id} entityType="liveCode" max />
            );
        case 'hrInterviewQA':
            return (
                <EntityEditNavigationButton
                    id={id}
                    entityType="hrInterviewQA"
                    max
                />
            );
        default:
            return null;
    }
};
