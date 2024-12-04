import React, { memo, useMemo } from 'react';
import {
    ClearRefinements,
    RefinementList,
    useRefinementList,
} from 'react-instantsearch';
import { useTranslation } from 'react-i18next';
import { useCategoryTabs } from '../../lib/hooks/useCategoryTabs';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleCategory } from '@/entities/Article';
import cls from './ArticleCategoryTabs.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleCategoryTabsProps {
    className?: string;
    value: ArticleCategory;
    onChangeCategory: (category: ArticleCategory) => void;
}

// const onTabClick = useCallback(
//     (tab: TabItem) => {
//         onChangeCategory(tab.value as ArticleCategory);
//     },
//     [onChangeCategory],
// );

const CustomRefinementList = ({
    categoryTabs,
    onChangeCategory,
    classNames,
    value,
}: any) => {
    const { refine, items } = useRefinementList({
        attribute: 'category',
    });
    const handleRefine = (item: any) => {
        refine(item.value); // Apply the refinement
        onChangeCategory(item.label as ArticleCategory); // Notify parent component
    };

    // @ts-ignore
    const transformedItems = categoryTabs.map((category) => {
        const matchingItem = items.find(
            (item: any) => item.label === category.label,
        );
        return (
            matchingItem || {
                ...category,
                count: 0,
                isRefined: false,
            }
        );
    });

    return (
        <div>
            <Tabs
                onTabClick={handleRefine}
                tabs={transformedItems}
                value={value}
                direction="column"
            />
            {/* <ul className={classNames.list}> */}
            {/*    {transformedItems.map((item: any) => ( */}
            {/*        <li */}
            {/*            key={item.label} */}
            {/*            className={`${classNames.item} ${ */}
            {/*                item.isRefined ? classNames.selectedItem : '' */}
            {/*            }`} */}
            {/*            onClick={() => handleRefine(item)} */}
            {/*        > */}
            {/*            <span>{item.label}</span> */}
            {/*            <span className={classNames.count}>{item.count}</span> */}
            {/*        </li> */}
            {/*    ))} */}
            {/* </ul> */}
        </div>
    );
};

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

                    {/* <RefinementList */}
                    {/*    attribute="category" */}
                    {/*    transformItems={(items) => { */}
                    {/*        return [ */}
                    {/*            ...categoryTabs.map((category) => { */}
                    {/*                const matchingItem = items.find( */}
                    {/*                    (item) => item.label === category.label, */}
                    {/*                ); */}
                    {/*                console.log('matchingItem', matchingItem); */}
                    {/*                return ( */}
                    {/*                    matchingItem || { */}
                    {/*                        ...category, */}
                    {/*                        count: 0, */}
                    {/*                        isRefined: false, */}
                    {/*                    } */}
                    {/*                ); */}
                    {/*            }), */}
                    {/*        ]; */}
                    {/*    }} */}
                    {/*    classNames={{ */}
                    {/*        count: cls.categoryCount, */}
                    {/*        list: cls.MenuList, */}
                    {/*        label: cls.MenuLabel, */}
                    {/*        item: cls.MenuItem, */}
                    {/*        selectedItem: cls.SelectedMenuItem, */}
                    {/*        checkbox: cls.MenuCheckbox, */}
                    {/*    }} */}
                    {/* /> */}

                    <CustomRefinementList
                        value={value}
                        categoryTabs={categoryTabs}
                        onChangeCategory={onChangeCategory}
                        classNames={{
                            list: cls.MenuList,
                            item: cls.MenuItem,
                            selectedItem: cls.SelectedMenuItem,
                            count: cls.categoryCount,
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
