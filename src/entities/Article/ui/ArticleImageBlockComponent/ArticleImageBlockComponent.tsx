import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { useImageLoader } from '@/shared/lib/hooks/useImageLoader/useImageLoader';
import { ArticleImageBlockComponentSkeleton } from './ArticleImageBlockComponentSkeleton/ArticleImageBlockComponentSkeleton';
import { ArticleImageBlockComponentError } from './ArticleImageBlockComponentError/ArticleImageBlockComponentError';
import { ImageModal } from '@/shared/ui/common/ImageModal';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;

        const { isLoading, imageError, setImageError } = useImageLoader(
            block.src,
        );
        const imageModal = useToggleVisibility();

        if (isLoading) {
            return <ArticleImageBlockComponentSkeleton className={className} />;
        }

        if (imageError) {
            return <ArticleImageBlockComponentError className={className} />;
        }
        return (
            <VStack
                className={classNames(cls.ImgBlock, {}, [className])}
                align="center"
                gap="8"
            >
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <img
                    src={block.src}
                    alt={block.title}
                    className={cls.img}
                    onError={() => setImageError(true)}
                    onClick={imageModal.show}
                />

                {imageModal.isVisible && (
                    <ImageModal
                        isOpen={imageModal.isVisible}
                        src={block.src}
                        title={block.title}
                        onClose={imageModal.hide}
                    />
                )}

                {block.title && (
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={
                            <Text
                                text={block.title}
                                align="center"
                                bold
                                withTags
                            />
                        }
                        off={
                            <TextDeprecated
                                text={block.title}
                                align={TextAlign.CENTER}
                                withTags
                            />
                        }
                    />
                )}
            </VStack>
        );
    },
);
