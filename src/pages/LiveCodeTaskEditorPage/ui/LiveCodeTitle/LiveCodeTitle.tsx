import React, { memo } from 'react';

import {
    EntityTitleInput,
    EntityTitleProps,
} from '@/features/EditorPageComponents';
import { LiveCode } from '@/entities/LiveCode';
import { useLiveCodeFormState } from '../../lib/hooks/useLiveCodeFormState/useLiveCodeFormState';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard as OrderCardRedesigned } from '@/shared/ui/redesigned/OrderCard';
import { toggleFeatures } from '@/shared/lib/features';
import { OrderCard as OrderCardDeprecated } from '@/shared/ui/deprecated/OrderCard';

export interface LiveCodeTitleProps {
    titleIndex: number;
    errors: EntityTitleProps<LiveCode>['errors'];
}

export const LiveCodeTitle = memo((props: LiveCodeTitleProps) => {
    const { titleIndex, errors } = props;
    const form = useLiveCodeFormState();

    const { formData, onChangeTitle } = form;

    if (!formData) {
        return null;
    }
    const OrderCard = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => OrderCardRedesigned,
        off: () => OrderCardDeprecated,
    });

    return (
        <VStack gap="24" max>
            <HStack gap="16" align="start" max>
                <OrderCard index={titleIndex} />
                <EntityTitleInput
                    errors={errors}
                    formData={formData}
                    onChangeTitle={onChangeTitle}
                    entityType="liveCode"
                />
            </HStack>
        </VStack>
    );
});
