import { ArticleEditNavigationButton } from '@/features/ArticleEditNavigationButton';
import { EntityType } from '@/shared/types/entityType';

export const renderEditButton = (entityType: EntityType, id: string) => {
    switch (entityType) {
        case 'article':
            return <ArticleEditNavigationButton id={id} max />;
        case 'liveCode':
            return <div>000</div>;
        // return <LiveCodeEditNavigationButton id={id} max />;
        default:
            return null;
    }
};
