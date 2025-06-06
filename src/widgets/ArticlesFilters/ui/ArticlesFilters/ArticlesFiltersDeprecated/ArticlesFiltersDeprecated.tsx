import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticlesFiltersProps } from '../ArticlesFilters';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from '../ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/deprecated/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleCategoryTabs } from '@/features/ArticleCategoryTabs';
import { ArticleSort } from '@/entities/Article';

export const ArticlesFiltersDeprecated = memo((props: ArticlesFiltersProps) => {
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
        <VStack
            gap="16"
            className={classNames(cls.ArticlesPageFilters, {}, [className])}
        >
            <ArticleSortSelector
                order={order}
                sort={sort as ArticleSort}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
            />
            <Card max>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Пошук')}
                    data-testid="ArticlesPage.SearchInput"
                />
            </Card>
            <ArticleCategoryTabs
                value={category}
                onChangeCategory={onChangeCategory}
                className={cls.tabs}
            />
        </VStack>
    );
});
