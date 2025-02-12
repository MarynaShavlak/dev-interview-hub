import React, { ChangeEvent, memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { AddHeroFormRedesigned } from './AddHeroFormRedesigned/AddHeroFormRedesigned';
import { AddHeroFormDeprecated } from './AddHeroFormDeprecated/AddHeroFormDeprecated';

export interface AddHeroFormProps {
    index: number;
    imagePreview: string | null;
    error: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
}
export const AddHeroForm = memo((props: AddHeroFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<AddHeroFormRedesigned {...props} />}
            off={<AddHeroFormDeprecated {...props} />}
        />
    );
});
