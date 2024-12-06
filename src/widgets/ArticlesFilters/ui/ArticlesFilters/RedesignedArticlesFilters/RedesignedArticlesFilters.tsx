import { useTranslation } from 'react-i18next';
import React from 'react';
import { SearchBox } from 'react-instantsearch';
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
import { useArticles } from '@/entities/Article';

// const HitComponent = ({ hit }: { hit: any }) => {
//     return (
//         <Card className={cls.HitCard}>
//             <h3>{hit.title}</h3>
//             <p>{hit.subtitle}</p>
//         </Card>
//     );
// };

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

    const { data: articles, isLoading: isArticlesLoading } = useArticles({});

    if (!articles) return null;

    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
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

                {/* <ArticleList view={ArticleView.GRID} articles={articles} /> */}
                {/* <Hits hitComponent={HitComponent} /> */}
            </VStack>
        </Card>
    );
};
