import { useTranslation } from 'react-i18next';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import {
    Configure,
    InstantSearch,
    RefinementList,
    SearchBox,
} from 'react-instantsearch';
import { useState } from 'react';
import type { RefinementListProps } from 'react-instantsearch';
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

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

// Hit component to display search results
const Hit = ({ hit }: { hit: any }) => (
    <div className="hit">
        <h3>{hit.title}</h3>
        <p>{hit.description}</p>
        <small>Category: {hit.category}</small>
    </div>
);

const transformItems: RefinementListProps['transformItems'] = (items) => {
    return items.map((item) => ({
        ...item,
        label: item.label.toUpperCase(),
    }));
};

const AlgoliaSearch = () => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('React');

    return (
        <InstantSearch searchClient={searchClient} indexName="articles">
            {/* Configure default filters */}
            <Configure filters="category" hitsPerPage={10} />

            <div className="search-container">
                {/* Search input */}
                <SearchBox
                    translations={{
                        // @ts-ignore
                        placeholder: 'Search for articles...',
                    }}
                    // @ts-ignore
                    onChange={(event) => setQuery(event.target.value)}
                />

                <div className="filters">
                    <RefinementList
                        attribute="category"
                        transformItems={transformItems}
                    />
                </div>

                {/* /!* Display search results *!/ */}
                {/* <div className="results"> */}
                {/*    <Hits hitComponent={Hit} /> */}
                {/* </div> */}

                {/* /!* Pagination *!/ */}
                {/* <Pagination /> */}
            </div>
        </InstantSearch>
    );
};

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
                {/* <InstantSearch searchClient={searchClient} indexName="articles"> */}
                {/*    <SearchBox /> */}
                {/*    <RefinementList attribute="category" /> */}
                {/* </InstantSearch> */}
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
