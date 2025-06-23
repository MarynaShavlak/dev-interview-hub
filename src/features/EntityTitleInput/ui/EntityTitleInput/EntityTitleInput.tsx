import React from 'react';
import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { EntityType } from '@/shared/types/entityType';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { EntityTitleInputRedesigned } from './EntityTitleInputRedesigned/EntityTitleInputRedesigned';
import { EntityTitleInputDeprecated } from './EntityTitleInputDeprecated/EntityTitleInputDeprecated';

export interface EntityTitleProps<T> {
    errors: {
        hasInputErrors: boolean;
        titleErrors: ValidationErrors;
    };
    formData: T;
    onChangeTitle: (value: string) => void;
    entityType: EntityType;
}

export const EntityTitleInput = <T extends { title?: string }>(
    props: EntityTitleProps<T>,
) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<EntityTitleInputRedesigned {...props} />}
            off={<EntityTitleInputDeprecated {...props} />}
        />
    );
};
