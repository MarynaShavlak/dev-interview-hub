import React, { ChangeEvent } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ImagePreviewRedesigned } from './ImagePreviewRedesigned/ImagePreviewRedesigned';
import { ImagePreviewDeprecated } from './ImagePreviewDeprecated/ImagePreviewDeprecated';

export interface ImagePreviewProps {
    imagePreview: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
    error: string | null;
    title: string;
    className?: string;
}

export const ImagePreview = (props: ImagePreviewProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ImagePreviewRedesigned {...props} />}
            off={<ImagePreviewDeprecated {...props} />}
        />
    );
};
