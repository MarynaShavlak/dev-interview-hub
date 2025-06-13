import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/deprecated/Tabs';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/deprecated/Text';

import { AddHRInterviewCategoryFormProps } from '../AddHRInterviewCategoryForm';
import { useHRInterviewQAFormState } from '../../../lib/hooks/useHRInterviewQAFormState/useHRInterviewQAFormState';
import { useHRCategoryTabs } from '@/features/HRInterviewCategoryTabs';

export const AddHRInterviewCategoryFormDeprecated = memo(
    (props: AddHRInterviewCategoryFormProps) => {
        const { t } = useTranslation('articleDetails');
        const { index } = props;
        const { formData, onChangeCategory } = useHRInterviewQAFormState();
        const rawCategoryTabs = useHRCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

        // useEffect(() => {
        //     // if (!formData?.category?.length && categoryTabs.length > 0) {
        //     onChangeCategory(categoryTabs[0].value);
        //     // }
        // }, [formData?.category, categoryTabs, onChangeCategory]);

        return (
            <HStack gap="16" align="start" max>
                <OrderCard index={index} />
                <VStack gap="16">
                    <Text title={t('Категорії питань')} />
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
