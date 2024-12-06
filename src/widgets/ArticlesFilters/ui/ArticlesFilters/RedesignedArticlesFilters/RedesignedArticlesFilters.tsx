import { useTranslation } from 'react-i18next';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import React, { useEffect, useState } from 'react';
import { SearchBox } from 'react-instantsearch';
import { Configure, InstantSearch } from 'react-instantsearch-core';
// import { ArticleSortSelector } from '@/features/ArticleSortSelector';

import { ArticlesFiltersProps } from '../ArticlesFilters';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { ArticleCategoryTabs } from '@/features/ArticleCategoryTabs';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { createRoutingConfig } from '../../../model/config/routingConfig';

const searchClient = algoliasearch(
    '6L3XOJ5FZ8',
    '5fac3ea964aecac5d90374450bd541ab',
);

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

    const [indexName, setIndexName] = useState<ArticleSortField>(sort);

    useEffect(() => {
        if (sort) {
            setIndexName(sort);
        }
    }, [sort]);

    if (!indexName) return null;

    const routing = createRoutingConfig(indexName);

    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <InstantSearch
                    searchClient={searchClient}
                    indexName={indexName}
                    routing={routing}
                    future={{
                        preserveSharedStateOnUnmount: true,
                    }}
                >
                    <Configure hitsPerPage={200} />
                    <SearchBox
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
                </InstantSearch>
            </VStack>
        </Card>
    );
};
