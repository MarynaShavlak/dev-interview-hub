import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import {
    getRouteArticleCreate,
    getRouteHRInterviewQACreate,
} from '@/shared/const/router/router';
import { Button } from '../../redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '../../deprecated/Button';

import cls from './AddNewEntityButton.module.scss';

interface AddNewEntityButtonProps {
    max?: boolean;
    entityType: 'article' | 'hrInterviewQA';
    onClick?: () => void;
}
const namespaceMap: Record<AddNewEntityButtonProps['entityType'], string> = {
    article: 'articles',
    hrInterviewQA: 'hrInterviewQA',
};

export const AddNewEntityButton = memo(
    ({ max = false, onClick, entityType }: AddNewEntityButtonProps) => {
        const namespace = namespaceMap[entityType];
        const { t } = useTranslation(namespace);
        const navigate = useNavigate();

        const onCreateArticle = useCallback(() => {
            onClick?.();
            switch (entityType) {
                case 'article':
                    navigate(getRouteArticleCreate());
                    break;
                case 'hrInterviewQA':
                    navigate(getRouteHRInterviewQACreate());
                    break;
                default: {
                    // Exhaustive check
                    const _exhaustiveCheck: never = entityType;
                    throw new Error(
                        `Unhandled entity type: ${_exhaustiveCheck}`,
                    );
                }
            }
        }, [entityType, navigate, onClick]);

        const buttonText = t('createButtonLabel', { defaultValue: 'Create' });
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Button
                        size="m"
                        onClick={onCreateArticle}
                        className={cls.addButton}
                        variant="save"
                        max={max}
                    >
                        {buttonText}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE}
                        onClick={onCreateArticle}
                    >
                        {buttonText}
                    </ButtonDeprecated>
                }
            />
        );
    },
);
