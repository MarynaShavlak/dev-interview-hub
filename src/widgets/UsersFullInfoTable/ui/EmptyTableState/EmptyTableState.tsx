import React, { memo } from 'react';

import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface EmptyTableStateProps {
    message: string;
}

export const EmptyTableState = memo(({ message }: EmptyTableStateProps) => {
    return (
        <VStack gap="16" max align="center">
            <Text text={message} />
        </VStack>
    );
});
