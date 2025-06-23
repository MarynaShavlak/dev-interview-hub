import { useTranslation } from 'react-i18next';
import { EntityType } from '@/shared/types/entityType';

export const useLabelTranslationKey = (entityType: EntityType) => {
    const { t } = useTranslation('articleDetails');
    switch (entityType) {
        case 'article':
            return t('Заголовок статті');
        case 'hrInterviewQA':
            return t('Питання від рекрутера');
        case 'liveCode':
            return t('Назва завдання');
        default: {
            const exhaustiveCheck: never = entityType;
            throw new Error(`Unhandled entity type case: ${exhaustiveCheck}`);
        }
    }
};
