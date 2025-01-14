import React, { ChangeEvent } from 'react';
import { v4 } from 'uuid';
import { VStack } from '@/shared/ui/common/Stack';
import { Box } from '@/shared/ui/common/Box/Box';
import { ArticleImageBlockComponent, ArticleSection } from '@/entities/Article';
import cls from './ImagePreview.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { FileUploadZone } from '@/shared/ui/redesigned/FileUploadZone';

interface ImagePreviewProps {
    imagePreview: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
    error: string | null;
    title: string;
    className?: string;
}

export const ImagePreview = (props: ImagePreviewProps) => {
    const {
        imagePreview,
        handleImageChange,
        resetImage,
        error,
        title,
        className,
    } = props;

    const previewWrapClass = imagePreview ? cls.previewWrap : '';

    return (
        <VStack gap="4" align="center" className={cls.blockImageZone}>
            <Box className={cls.avatarWrap}>
                <VStack gap="16" max className={previewWrapClass}>
                    {imagePreview && (
                        <ArticleImageBlockComponent
                            block={{
                                type: ArticleSection.IMAGE,
                                title: '',
                                src: imagePreview,
                                id: v4(),
                            }}
                        />
                    )}
                    <FileUploadZone
                        imagePreview={imagePreview}
                        handleImageChange={handleImageChange}
                        resetImage={resetImage}
                        className={cls.blockImageZone}
                    />
                </VStack>
            </Box>

            {error && <Text text={error} variant="error" />}
        </VStack>
    );
};
