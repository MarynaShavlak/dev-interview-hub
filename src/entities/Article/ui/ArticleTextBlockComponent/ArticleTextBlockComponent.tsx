import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { getTagContent } from '@/shared/lib/text/getTagContent/getTagContent';
import { List } from '@/shared/ui/redesigned/List';
import { VStack } from '@/shared/ui/common/Stack';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

const renderText = (text: string) => {
    const result = getTagContent(text);

    if (typeof result === 'string') {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text text={result} className={cls.paragraph} withTags />}
                off={
                    <TextDeprecated
                        text={result}
                        className={cls.paragraph}
                        withTags
                    />
                }
            />
        );
    }
    if (typeof result === 'object') {
        return (
            <List
                items={result.items}
                variant="primary"
                size="m"
                type={result.name}
            />
        );
    }
};

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(cls.ArticleTextBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={<Text title={block.title} className={cls.title} />}
                        off={
                            <TextDeprecated
                                title={block.title}
                                className={cls.title}
                            />
                        }
                    />
                )}
                <VStack gap="8">
                    <Each of={block.paragraphs} render={renderText} />
                </VStack>
            </div>
        );
    },
);
