import { memo } from 'react';
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
                <img
                    src={block.src}
                    alt={block.title}
                    className={cls.img}
                    onError={() => setImageError(true)}
                />
                {block.title && (
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={<Text text={block.title} align="center" bold />}
                        off={
                            <TextDeprecated
                                text={block.title}
                                align={TextAlign.CENTER}
                            />
                        }
                    />
                )}
            </VStack>
        );
    },
);
