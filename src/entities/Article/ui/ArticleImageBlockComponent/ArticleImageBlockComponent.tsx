import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;
        const [imageError, setImageError] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const { t } = useTranslation();
        useEffect(() => {
            const checkImage = async (url: string) => {
                try {
                    const img = new Image();
                    img.onload = () => {
                        setIsLoading(false);
                        setImageError(false);
                    };
                    img.onerror = () => {
                        setIsLoading(false);
                        setImageError(true);
                    };
                    img.src = url;
                } catch (error) {
                    setIsLoading(false);
                    setImageError(true);
                }
            };

            if (block.src) {
                checkImage(block.src);
            } else {
                setIsLoading(false);
                setImageError(true);
            }
        }, [block.src]);

        if (isLoading) {
            return (
                <VStack
                    className={classNames(cls.ImgBlock, {}, [className])}
                    align="center"
                    gap="8"
                >
                    <Text text="Loading..." align="center" />
                </VStack>
            );
        }

        if (imageError) {
            return (
                <VStack
                    className={classNames(cls.ImgBlock, {}, [className])}
                    align="center"
                    gap="8"
                >
                    <Text
                        text={t('Не вдалося завантажити зображення')}
                        align="center"
                    />
                </VStack>
            );
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
