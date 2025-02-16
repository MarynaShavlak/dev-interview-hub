import React, { memo, useMemo } from 'react';
import { ClearRefinements, RefinementList } from 'react-instantsearch';
import { useTranslation } from 'react-i18next';

import cls from '../ArticleCategoryTabs.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { useCategoryTabs } from '../../../lib/hooks/useCategoryTabs';

export const ArticleCategoryTabsRedesigned = memo(() => {
    const { t } = useTranslation();
    const rawCategoryTabs = useCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

    return (
        <VStack gap="8">
            <ClearRefinements
                translations={{
                    resetButtonText: t('Вcі статті'),
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
                                (item) => item.label === category.label,
                            );

                            return (
                                matchingItem || {
                                    ...category,
                                    count: 0,
                                    isRefined: false,
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
});
