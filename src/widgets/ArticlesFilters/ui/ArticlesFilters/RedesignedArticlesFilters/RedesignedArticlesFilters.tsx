import { useTranslation } from 'react-i18next';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import React, { useState } from 'react';
import {
    ClearRefinements,
    Configure,
    InstantSearch,
    Menu,
    MenuProps,
    SearchBox,
    SortBy,
} from 'react-instantsearch';

import { ArticleCategoryTabs } from '@/features/ArticleCategoryTabs';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticlesFiltersProps } from '../ArticlesFilters';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

const transformItems: MenuProps['transformItems'] = (items) => {
    // return items.map((item) => ({
    //     ...item,
    //     label: `${item.label} `,
    // }));

    return [
        // {
        //     label: 'All items',
        //     value: '',
        //     count: items.reduce((total, item) => total + item.count, 0),
        //     isRefined: items.every((item) => !item.isRefined),
        // },
        ...items.map((item) => ({
            ...item,
            label: `${item.label}`,
        })),
    ];
};

const AlgoliaSearch = () => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const handleCategoryChange = (category: string) => {
        // Update selected category; 'null' or empty string for "All items"
        setSelectedCategory(category);
    };
    return (
        <InstantSearch searchClient={searchClient} indexName="articles">
            {/* Configure dynamic filters based on selected categories */}
            <Configure
                filters={
                    selectedCategory ? `category:"${selectedCategory}"` : ''
                }
                hitsPerPage={200}
            />
            <SearchBox
                // onChange={onChangeSearch}
                // value={search}
                placeholder={t('Пошук')}
                resetIconComponent={() => (
                    <Icon Svg={CloseIcon} className={cls.ResetIcon} />
                )}
                submitIconComponent={() => <Icon Svg={SearchIcon} />}
                data-testid="ArticlesPage.SearchInput"
                classNames={{
                    submit: cls.SubmitSearchBtn,
                    reset: cls.ResetSearchBtn,
                    form: cls.SubmitInputWrapper,
                    input: cls.SearchInput,
                }}
            />
            {/* <RefinementList attribute="category" /> */}
            <ClearRefinements />
            <Menu
                attribute="category"
                // limit={250}
                transformItems={transformItems}
                classNames={{
                    link: cls.MenuLink,
                    count: cls.categoryCount,
                    list: cls.MenuList,
                    item: cls.MenuItem,
                    selectedItem: cls.SelectedMenuItem,
                }}
            />
            <SortBy
                items={[
                    { label: 'Views (asc)', value: 'articles_views_asc' },
                    { label: 'Views (desc)', value: 'articles_views_desc' },
                    {
                        label: 'Creation date (asc)',
                        value: 'articles_createdAt_asc',
                    },
                    {
                        label: 'Creation date (desc)',
                        value: 'articles_createdAt_desc',
                    },
                    { label: 'Title (asc)', value: 'articles_title_asc' },
                    { label: 'Title (desc)', value: 'articles_title_desc' },
                ]}
            />
        </InstantSearch>
    );
};
// const AlgoliaSearch = () => {
//     return (
//         <InstantSearch searchClient={searchClient} indexName="articles">
//             <Configure filters="category" hitsPerPage={10} />
//             <div className="search-container">
//                 <div className="filters">
//                     <RefinementList attribute="category" />
//                 </div>
//             </div>
//         </InstantSearch>
//     );
// };
{
    /* /!* Display search results *!/ */
}
{
    /* <div className="results"> */
}
{
    /*    <Hits hitComponent={Hit} /> */
}
{
    /* </div> */
}

{
    /* /!* Pagination *!/ */
}
{
    /* <Pagination /> */
}
{
    /* Search input */
}
{
    /* <SearchBox */
}
{
    /*    translations={{ */
}
{
    /*        // @ts-ignore */
}
{
    /*        placeholder: 'Search for articles...', */
}
{
    /*    }} */
}
{
    /*    // @ts-ignore */
}
{
    /*    onChange={(event) => setQuery(event.target.value)} */
}
{
    /* /> */
}

export const RedesignedArticlesFilters = (props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeCategory,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
        category,
    } = props;
    const { t } = useTranslation();
    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <AlgoliaSearch />
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Пошук')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                    data-testid="ArticlesPage.SearchInput"
                />
                <ArticleCategoryTabs
                    value={category}
                    onChangeCategory={onChangeCategory}
                    className={cls.tabs}
                />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
};
