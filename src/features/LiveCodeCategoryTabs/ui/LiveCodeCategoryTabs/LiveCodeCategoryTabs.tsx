import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClearRefinements, RefinementList } from 'react-instantsearch';
import { VStack } from '@/shared/ui/common/Stack';
import cls from './LiveCodeCategoryTabs.module.scss';
import { useLiveCodeCategoryTabs } from '../../lib/hooks/useLiveCodeCategoryTabs/useLiveCodeCategoryTabs';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getDesignVariantClass } from '@/shared/lib/classes/getDesignVariantClass/getDesignVariantClass';

export interface LiveCodeCategoryTabsProps {
    className?: string;
}

export const LiveCodeCategoryTabs = memo((props: LiveCodeCategoryTabsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const rawCategoryTabs = useLiveCodeCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

    const allItemsBtnClass = getDesignVariantClass(
        cls.AllItemsBtnRedesigned,
        cls.AllItemsBtnDeprecated,
    );

    const allItemsNotSelectedBtnClass = getDesignVariantClass(
        cls.AllItemsBtnNotSelectedRedesigned,
        cls.AllItemsBtnNotSelectedDeprecated,
    );

    const categoryCountClass = getDesignVariantClass(
        cls.categoryCountRedesigned,
        cls.categoryCountDeprecated,
    );

    const selectedItemClass = getDesignVariantClass(
        cls.SelectedMenuItemRedesigned,
        cls.SelectedMenuItemDeprecated,
    );

    const menuItemClass = getDesignVariantClass(
        cls.MenuItemRedesigned,
        cls.MenuItemDeprecated,
    );

    const menuListClass = getDesignVariantClass(
        cls.MenuListRedesigned,
        cls.MenuListDeprecated,
    );

    return (
        <VStack gap="8" className={className}>
            <ClearRefinements
                translations={{
                    resetButtonText: t('Вcі питання'),
                }}
                classNames={{
                    button: classNames(allItemsBtnClass, {}, [cls.AllItemsBtn]),
                    disabledButton: classNames(
                        allItemsNotSelectedBtnClass,
                        {},
                        [cls.AllItemsBtnNotSelected],
                    ),
                }}
            />

            <RefinementList
                attribute=""
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
                    count: classNames(categoryCountClass, {}, [
                        cls.categoryCount,
                    ]),
                    list: classNames(menuListClass, {}, [cls.MenuList]),
                    label: cls.MenuLabel,
                    item: classNames(menuItemClass, {}, [cls.MenuItem]),
                    selectedItem: selectedItemClass,
                    checkbox: cls.MenuCheckbox,
                }}
            />
        </VStack>
    );
});
