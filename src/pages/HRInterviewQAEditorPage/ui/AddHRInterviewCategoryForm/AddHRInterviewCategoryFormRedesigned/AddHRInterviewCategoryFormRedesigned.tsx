import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { AddHRInterviewCategoryFormProps } from '../AddHRInterviewCategoryForm';
import { useHRInterviewQAFormState } from '../../../lib/hooks/useHRInterviewQAFormState/useHRInterviewQAFormState';
import { useHRCategoryTabs } from '../../../lib/hooks/useHRCategoryTabs/useHRCategoryTabs';

export const AddHRInterviewCategoryFormRedesigned = memo(
    (props: AddHRInterviewCategoryFormProps) => {
        const { t } = useTranslation('articleDetails');
        const { index } = props;
        const { formData, onChangeCategory } = useHRInterviewQAFormState();
        const rawCategoryTabs = useHRCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

        // useEffect(() => {
        //     // if (!formData?.category?.length && categoryTabs.length > 0) {
        //     onChangeCategory(categoryTabs[0].tabs.value);
        //     // }
        // }, [formData?.category, categoryTabs, onChangeCategory]);

        return (
            <HStack gap="16" align="start" max>
                <OrderCard index={index} />
                <VStack gap="16">
                    <Text text={t('Категорії питань')} bold />
                    <Text text={t('Оберіть категорію')} italic />
                    {categoryTabs.map((category, idx) => (
                        <HStack gap="16" key={idx}>
                            <Text text={category.groupLabel} />
                            <Tabs
                                tabs={category.tabs}
                                value={formData?.category.label || ''}
                                onTabClick={(tab) => {
                                    onChangeCategory(tab.value);
                                }}
                            />
                        </HStack>
                    ))}
                </VStack>
            </HStack>
        );
    },
);
