import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClearRefinements, Menu } from 'react-instantsearch';
import { VStack } from '@/shared/ui/common/Stack';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getDesignVariantClass } from '@/shared/lib/classes/getDesignVariantClass/getDesignVariantClass';
import cls from './EntityCategoryTabs.module.scss';
import { EntityType } from '@/shared/types/entityType';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export interface EntityCategoryTabsProps {
    className?: string;
    entityType: EntityType;
    categoryTabs: TabItem[];
    categoryCounts: Record<string, number>;
}

export const EntityCategoryTabs = memo((props: EntityCategoryTabsProps) => {
    const { className, entityType, categoryTabs, categoryCounts } = props;
    const { t } = useTranslation();

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
                    resetButtonText:
                        entityType === 'hrInterviewQA'
                            ? t('Вcі питання')
                            : t('Вcі завдання'),
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
                                    count: categoryCounts[category.value] || 0,
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
                }}
            />
        </VStack>
    );
});
