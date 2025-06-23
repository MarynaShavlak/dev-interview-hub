import { EntityType } from '@/shared/types/entityType';

export const getStorageKey = (entityType: EntityType): string => {
    switch (entityType) {
        case 'article':
            return 'ARTICLE_TO_CREATE_TITLE';
        case 'hrInterviewQA':
            return 'HR_INTERVIEW_TO_CREATE_TITLE';
        case 'liveCode':
            return 'LIVE_CODE_TO_CREATE_TITLE';
        default: {
            const exhaustiveCheck: never = entityType;
            throw new Error(`Unhandled entity type case: ${exhaustiveCheck}`);
        }
    }
};
