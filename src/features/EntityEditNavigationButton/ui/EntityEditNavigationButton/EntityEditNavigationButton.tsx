import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { EntityType } from '@/shared/types/entityType';
import {
    useArticleDataById,
    useEditArticleNavigation,
} from '@/entities/Article';
import {
    useLiveCodeDataById,
    useEditLiveCodeTaskNavigation,
} from '@/entities/LiveCode';
import {
    useEditHRInterviewQANavigation,
    useHRInterviewQADataById,
} from '@/entities/HRInterviewQA';

interface EntityEditNavigationButtonProps {
    id: string;
    entityType: EntityType;
    max?: boolean;
}

export const EntityEditNavigationButton = memo(
    ({ id, entityType, max = false }: EntityEditNavigationButtonProps) => {
        const { t } = useTranslation();

        const articleData = useArticleDataById(
            entityType === 'article' ? id : '',
        );
        const liveCodeData = useLiveCodeDataById(
            entityType === 'liveCode' ? id : '',
        );

        const hrInterviewQaData = useHRInterviewQADataById(
            entityType === 'hrInterviewQA' ? id : '',
        );

        const { navigateToEditArticle } = useEditArticleNavigation();
        const { navigateToEditLiveCodeTask } = useEditLiveCodeTaskNavigation();
        const { navigateToEditHRInterviewQA } =
            useEditHRInterviewQANavigation();

        const getEntityData = () => {
            switch (entityType) {
                case 'article':
                    return articleData;
                case 'liveCode':
                    return liveCodeData;
                case 'hrInterviewQA':
                    return hrInterviewQaData;
                default:
                    return { data: null, isLoading: false, error: null };
            }
        };

        const { data: entity } = getEntityData();

        const onEditEntity = useCallback(() => {
            if (!entity) return;

            switch (entityType) {
                case 'article':
                    navigateToEditArticle(entity.id);
                    break;
                case 'liveCode':
                    navigateToEditLiveCodeTask(entity.id);
                    break;
                case 'hrInterviewQA':
                    navigateToEditHRInterviewQA(entity.id);
                    break;
                default:
                    break;
            }
        }, [
            entity,
            entityType,
            navigateToEditArticle,
            navigateToEditHRInterviewQA,
            navigateToEditLiveCodeTask,
        ]);

        const getButtonText = () => {
            switch (entityType) {
                case 'article':
                    return t('Редагувати статтю');
                case 'liveCode':
                    return t('Редагувати код');
                case 'hrInterviewQA':
                    return t('Редагувати питання');
                default:
                    return t('Редагувати');
            }
        };

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button onClick={onEditEntity} max={max}>
                        {t('Редагувати')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEditEntity}
                    >
                        {getButtonText()}
                    </ButtonDeprecated>
                }
            />
        );
    },
);
