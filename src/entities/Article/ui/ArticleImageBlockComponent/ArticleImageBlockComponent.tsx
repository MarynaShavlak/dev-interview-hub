import { memo } from 'react';
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

        return (
            <VStack
                className={classNames(cls.ImgBlock, {}, [className])}
                align="center"
                gap="8"
            >
                <img src={block.src} alt={block.title} className={cls.img} />
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
