import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { AddLiveCodeCategoryFormProps } from '../AddLiveCodeCategoryForm';
import { useLiveCodeFormState } from '../../../lib/hooks/useLiveCodeFormState/useLiveCodeFormState';
import { useHRCategoryTabs } from '@/features/HRInterviewCategoryTabs';

export const AddLiveCodeCategoryFormRedesigned = memo(
    (props: AddLiveCodeCategoryFormProps) => {
        const { t } = useTranslation();
        const { index } = props;
        const { formData, onChangeCategory } = useLiveCodeFormState();
        const rawCategoryTabs = useHRCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

        return (
            <HStack gap="16" align="start" max>
                <OrderCard index={index} />

                <VStack gap="16">
                    <Text text={t('Категорії завдань')} bold />
                    <Text text={t('Оберіть одну категорію')} italic />

                    <Tabs
                        tabs={categoryTabs}
                        value={formData?.category || ''}
                        onTabClick={(tab) => {
                            onChangeCategory(tab.value);
                        }}
                    />
                </VStack>
            </HStack>
        );
    },
);
