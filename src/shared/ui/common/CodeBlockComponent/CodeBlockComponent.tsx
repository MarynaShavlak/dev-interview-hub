import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Code } from '../../redesigned/Code';
import { Code as CodeDeprecated } from '../../deprecated/Code';
import { Text } from '../../redesigned/Text';
import { Text as TextDeprecated, TextAlign } from '../../deprecated/Text';
import { VStack } from '../Stack';

interface CodeBlockComponentProps {
    className?: string;
    title?: string;
    code: string;
}

export const CodeBlockComponent = memo((props: CodeBlockComponentProps) => {
    const { className, title, code } = props;

    return (
        <VStack className={className} gap="16" align="center" max>
            {title && (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={title} bold withTags align="center" />}
                    off={
                        <TextDeprecated
                            text={title}
                            withTags
                            align={TextAlign.CENTER}
                        />
                    }
                />
            )}
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Code text={code} />}
                off={<CodeDeprecated text={code} />}
            />
        </VStack>
    );
});
