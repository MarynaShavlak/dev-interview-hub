import React, { memo } from 'react';

import {
    EntityTitleInput,
    EntityTitleProps,
} from '@/features/EntityTitleInput';
import { HRInterviewQA } from '@/entities/HRInterviewQA';
import { useHRInterviewQAFormState } from '../../lib/hooks/useHRInterviewQAFormState/useHRInterviewQAFormState';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard as OrderCardRedesigned } from '@/shared/ui/redesigned/OrderCard';
import { toggleFeatures } from '@/shared/lib/features';
import { OrderCard as OrderCardDeprecated } from '@/shared/ui/deprecated/OrderCard';

export interface HRInterviewQATitleProps {
    titleIndex: number;
    errors: EntityTitleProps<HRInterviewQA>['errors'];
}

export const HRInterviewQATitle = memo((props: HRInterviewQATitleProps) => {
    const { titleIndex, errors } = props;
    const form = useHRInterviewQAFormState();

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
                    entityType="hrInterviewQA"
                />
            </HStack>
        </VStack>
    );
});
