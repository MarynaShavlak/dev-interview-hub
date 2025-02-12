import React, { ChangeEvent, memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ImageEditorFormRedesigned } from './ImageEditorFormRedesigned/ImageEditorFormRedesigned';
import { ImageEditorFormDeprecated } from './ImageEditorFormDeprecated/ImageEditorFormDeprecated';

export interface ImageEditorFormProps {
    title: string;
    handleTitleChange: (title: string) => void;
    onSave: () => void;
    onDelete: () => void;
    hasNoValidImage: boolean;
    preview: string | null;
    imageTypeError: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
}

export const ImageEditorForm = memo((props: ImageEditorFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ImageEditorFormRedesigned {...props} />}
            off={<ImageEditorFormDeprecated {...props} />}
        />
    );
});
