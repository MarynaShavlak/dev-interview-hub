import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import cls from '../ImageModal/ImageModal.module.scss';
import { Text } from '../../../redesigned/Text';
import { Text as TextDeprecated, TextAlign } from '../../../deprecated/Text';
import { VStack } from '../../Stack';

export interface ImageModalContentProps {
    src: string;
    title: string;
}

const ImageModalContent = memo((props: ImageModalContentProps) => {
    const { src, title } = props;
    return (
        <VStack gap="4" align="center" className={cls.imgModalContent}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={title} align="center" bold withTags />}
                off={
                    <TextDeprecated
                        text={title}
                        align={TextAlign.CENTER}
                        withTags
                    />
                }
            />
            <img src={src} alt={title} className={cls.img} />
        </VStack>
    );
});

export default ImageModalContent;
