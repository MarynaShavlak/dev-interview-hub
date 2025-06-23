import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/deprecated/Tabs';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/deprecated/Text';

import { AddLiveCodeCategoryFormProps } from '../AddLiveCodeCategoryForm';
import { useLiveCodeFormState } from '../../../lib/hooks/useLiveCodeFormState/useLiveCodeFormState';
import { useLiveCodeCategoryTabs } from '@/features/LiveCodeCategoryTabs';

export const AddLiveCodeCategoryFormDeprecated = memo(
    (props: AddLiveCodeCategoryFormProps) => {
        const { t } = useTranslation();
        const { index } = props;
        const { formData, onChangeCategory } = useLiveCodeFormState();
        const rawCategoryTabs = useLiveCodeCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

        return (
            <HStack gap="16" align="start" max>
                <OrderCard index={index} />
                <VStack gap="16">
                    <Text title={t('Категорії завдань')} />
                    <Text text={t('Оберіть одну категорію')} />
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
