import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeSort,
        onChangeCategory,
        sort,
        category,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
        limit,
    } = useArticleFilters();
    // console.log('sort when first hook usage', sort);

    // if (!sort || !order) {
    //     return null;
    // }

    return (
        <ArticlesFilters
            category={category}
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            limit={limit}
            onChangeSort={onChangeSort}
            onChangeCategory={onChangeCategory}
            className={className}
        />
    );
});
