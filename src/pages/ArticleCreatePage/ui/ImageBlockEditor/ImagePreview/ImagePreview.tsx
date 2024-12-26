import React, { ChangeEvent } from 'react';
import { v4 } from 'uuid';
import { VStack } from '@/shared/ui/common/Stack';
import { Box } from '@/shared/ui/common/Box/Box';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleImageBlockComponent, ArticleSection } from '@/entities/Article';
import cls from '../ImageBlockEditor.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { UploadButton } from '../UploadButton/UploadButton';

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

    const uploadZoneClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });
    const previewWrapClass = imagePreview ? cls.previewWrap : '';

    return (
        <VStack gap="4" align="center">
            <Box className={cls.avatarWrap}>
                <VStack gap="16" align="center" className={previewWrapClass}>
                    {!imagePreview && (
                        <Card
                            className={classNames(
                                cls.uploadZone,
                                {},
                                uploadZoneClasses,
                            )}
                        >
                            <UploadButton
                                handleImageChange={handleImageChange}
                                imagePreview={imagePreview}
                            />
                        </Card>
                    )}
                    {imagePreview && (
                        <>
                            <ArticleImageBlockComponent
                                block={{
                                    type: ArticleSection.IMAGE,
                                    title,
                                    src: imagePreview,
                                    id: v4(),
                                }}
                            />
                            <UploadButton
                                handleImageChange={handleImageChange}
                                imagePreview={imagePreview}
                            />
                        </>
                    )}
                </VStack>
            </Box>

            {error && <Text text={error} variant="error" />}
        </VStack>
    );
};
