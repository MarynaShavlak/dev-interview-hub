import React from 'react';
import { v4 } from 'uuid';
import { FileUploadZone } from '@/shared/ui/deprecated/FileUploadZone';
import { VStack } from '@/shared/ui/common/Stack';
import { Box } from '@/shared/ui/common/Box/Box';
import { ArticleImageBlockComponent } from '@/entities/Article';
import cls from '../ImagePreview.module.scss';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { ImagePreviewProps } from '../ImagePreview';
import { SectionType } from '@/shared/types/sectionTypes';

export const ImagePreviewDeprecated = (props: ImagePreviewProps) => {
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
        <VStack
            gap="4"
            align="center"
            className={cls.blockImageZone}
            justify="center"
        >
            <Box className={cls.avatarWrap}>
                <VStack gap="16" max className={previewWrapClass}>
                    {imagePreview && (
                        <ArticleImageBlockComponent
                            block={{
                                type: SectionType.IMAGE,
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

            {error && <Text text={error} theme={TextTheme.ERROR} />}
        </VStack>
    );
};
