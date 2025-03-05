import React, { memo } from 'react';
import { List } from '@/shared/ui/common/List';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { getTagContent } from '@/shared/lib/text/getTagContent/getTagContent';
import { VStack } from '@/shared/ui/common/Stack';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
    withTags: boolean;
}

const renderText = (text: string, withTags: boolean) => {
    const result = getTagContent(text);

    if (typeof result === 'string') {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Text
                        text={result}
                        className={cls.paragraph}
                        withTags={withTags}
                    />
                }
                off={
                    <TextDeprecated
                        text={result}
                        className={cls.paragraph}
                        withTags={withTags}
                    />
                }
            />
        );
    }
    if (typeof result === 'object') {
        return (
            <List items={result.items} variant="primary" type={result.name} />
        );
    }
    return null;
};

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block, withTags } = props;

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
                    <Each
                        of={block.paragraphs}
                        render={(text) => renderText(text, withTags)}
                    />
                </VStack>
            </div>
        );
    },
);
