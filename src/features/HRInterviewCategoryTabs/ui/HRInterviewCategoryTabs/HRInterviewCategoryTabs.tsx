import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClearRefinements, RefinementList } from 'react-instantsearch';
import { VStack } from '@/shared/ui/common/Stack';
import cls from './HRInterviewCategoryTabs.module.scss';
import { useHRCategoryTabs } from '../../lib/hooks/useHRCategoryTabs/useHRCategoryTabs';

export interface HRInterviewCategoryTabsProps {
    className?: string;
}

export const HRInterviewCategoryTabs = memo(
    (props: HRInterviewCategoryTabsProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const rawCategoryTabs = useHRCategoryTabs();
        const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

        return (
            <VStack gap="8" className={className}>
                <ClearRefinements
                    translations={{
                        resetButtonText: t('Вcі питання'),
                    }}
                    classNames={{
                        button: cls.AllItemsBtn,
                        disabledButton: cls.AllItemsBtnNotSelected,
                    }}
                />

                <RefinementList
                    attribute="category"
                    transformItems={(items) => {
                        return [
                            ...categoryTabs.map((category) => {
                                const matchingItem = items.find(
                                    (item) => item.value === category.value,
                                );
                                if (matchingItem) {
                                    return {
                                        ...matchingItem,
                                        label: category.label,
                                    };
                                }

                                return (
                                    matchingItem || {
                                        ...category,
                                        count: 0,
                                        isRefined: false,
                                        label: category.label,
                                    }
                                );
                            }),
                        ];
                    }}
                    classNames={{
                        count: cls.categoryCount,
                        list: cls.MenuList,
                        label: cls.MenuLabel,
                        item: cls.MenuItem,
                        selectedItem: cls.SelectedMenuItem,
                        checkbox: cls.MenuCheckbox,
                    }}
                />
            </VStack>
        );
    },
);
