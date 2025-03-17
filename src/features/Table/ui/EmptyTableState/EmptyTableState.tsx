import React, { memo, ReactNode } from 'react';

import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';

import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface EmptyTableStateProps {
    message: string;
    children?: ReactNode;
}

export const EmptyTableState = memo(
    ({ message, children }: EmptyTableStateProps) => {
        return (
            <VStack gap="16" max align="center">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={message} />}
                    off={<TextDeprecated text={message} />}
                />
                {children}
            </VStack>
        );
    },
);
