import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import {
    getRouteArticleCreate,
    getRouteHRInterviewQACreate,
} from '@/shared/const/router/router';
import { Button, ButtonSize } from '../../redesigned/Button';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
    ButtonSize as DeprecatedButtonSize,
} from '../../deprecated/Button';

import cls from './AddNewEntityButton.module.scss';
import { EntityType } from '@/shared/types/entityType';

interface AddNewEntityButtonProps {
    max?: boolean;
    size?: ButtonSize;
    entityType: EntityType;
    onClick?: () => void;
}
const namespaceMap: Record<AddNewEntityButtonProps['entityType'], string> = {
    article: 'articles',
    hrInterviewQA: 'hrInterviewQA',
};

export const AddNewEntityButton = memo(
    ({
        max = false,
        onClick,
        entityType,
        size = 's',
    }: AddNewEntityButtonProps) => {
        const namespace = namespaceMap[entityType];
        const { t } = useTranslation(namespace);
        const navigate = useNavigate();
        const deprecatedSizeMap: Record<ButtonSize, DeprecatedButtonSize> = {
            s: DeprecatedButtonSize.S,
            m: DeprecatedButtonSize.M,
            l: DeprecatedButtonSize.L,
            xl: DeprecatedButtonSize.XL,
        };

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
                        size={size}
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
                        size={deprecatedSizeMap[size]}
                    >
                        {buttonText}
                    </ButtonDeprecated>
                }
            />
        );
    },
);
