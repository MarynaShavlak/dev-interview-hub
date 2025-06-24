import React, { memo } from 'react';
import { List } from '../List';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { Text as TextDeprecated } from '../../deprecated/Text';
import { Text } from '../../redesigned/Text';
import cls from './TextBlockComponent.module.scss';
import { getTagContent } from '@/shared/lib/text/getTagContent/getTagContent';
import { VStack } from '../Stack';

interface TextBlockComponentProps {
    className?: string;
    title?: string;
    paragraphs: string[];
    withTags?: boolean;
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

export const TextBlockComponent = memo((props: TextBlockComponentProps) => {
    const { className, title, paragraphs, withTags = false } = props;

    return (
        <div className={className}>
            {title && (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text title={title} className={cls.title} />}
                    off={<TextDeprecated title={title} className={cls.title} />}
                />
            )}
            <VStack gap="8">
                <Each
                    of={paragraphs}
                    render={(text) => renderText(text, withTags)}
                />
            </VStack>
        </div>
    );
});
