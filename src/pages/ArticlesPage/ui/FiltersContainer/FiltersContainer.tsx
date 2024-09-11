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
    } = useArticleFilters();
    console.log('sort:', sort);

    console.log('order:', order);

    return (
        <ArticlesFilters
            category={category}
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeCategory={onChangeCategory}
            className={className}
        />
    );
});
