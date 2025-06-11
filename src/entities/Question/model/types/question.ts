import { EntityType } from '@/shared/types/entityType';

export interface Question {
    id: string;
    userId: string;
    text: string;
    createdAt: string;
    type: EntityType;
}
