import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClearRefinements, Menu } from 'react-instantsearch';
import { VStack } from '@/shared/ui/common/Stack';
import cls from './HRInterviewCategoryTabs.module.scss';
import { useHRCategoryTabs } from '../../lib/hooks/useHRCategoryTabs/useHRCategoryTabs';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getDesignVariantClass } from '@/shared/lib/classes/getDesignVariantClass/getDesignVariantClass';

export interface HRInterviewCategoryTabsProps {
    className?: string;
}

export const HRInterviewCategoryTabs = memo(
    (props: HRInterviewCategoryTabsProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const rawCategoryTabs = useHRCategoryTabs();
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
        const menuLinkClass = getDesignVariantClass(
            cls.MenuLinkRedesigned,
            cls.MenuLinkDeprecated,
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
                        button: classNames(allItemsBtnClass, {}, [
                            cls.AllItemsBtn,
                        ]),
                        disabledButton: classNames(
                            allItemsNotSelectedBtnClass,
                            {},
                            [cls.AllItemsBtnNotSelected],
                        ),
                    }}
                />

                <Menu
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
                        count: classNames(categoryCountClass, {}, [
                            cls.categoryCount,
                        ]),
                        list: classNames(menuListClass, {}, [cls.MenuList]),
                        label: cls.MenuLabel,
                        item: classNames(menuItemClass, {}, [cls.MenuItem]),
                        link: classNames(menuLinkClass, {}, [cls.MenuLink]),
                        selectedItem: selectedItemClass,
                        // checkbox: cls.MenuCheckbox,
                    }}
                />
            </VStack>
        );
    },
);
