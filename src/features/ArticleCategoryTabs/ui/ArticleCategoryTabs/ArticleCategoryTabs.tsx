import React, { memo, useMemo } from 'react';
import { ClearRefinements, RefinementList } from 'react-instantsearch';
import { useTranslation } from 'react-i18next';
import { useCategoryTabs } from '../../lib/hooks/useCategoryTabs';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCategory } from '@/entities/Article';
import cls from './ArticleCategoryTabs.module.scss';
import { VStack } from '@/shared/ui/common/Stack';

interface ArticleCategoryTabsProps {
    className?: string;
    value: ArticleCategory;
    onChangeCategory: (category: ArticleCategory) => void;
}

export const ArticleCategoryTabs = memo((props: ArticleCategoryTabsProps) => {
    const { className, value, onChangeCategory } = props;
    const { t } = useTranslation();
    const rawCategoryTabs = useCategoryTabs();
    const categoryTabs = useMemo(() => rawCategoryTabs, [rawCategoryTabs]);

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
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
            }
            off={
                <VStack gap="8" className={className}>
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
            }
        />
    );
});

// <TabsDeprecated
//     tabs={categoryTabs}
//     value={value}
//     onTabClick={onTabClick}
//     className={classNames('', {}, [className])}
// />
