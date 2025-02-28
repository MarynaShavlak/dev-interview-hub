import { useTranslation } from 'react-i18next';

import { SearchBox } from 'react-instantsearch';

import { memo } from 'react';
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

const ResetIconComponent = memo(() => (
    <Icon Svg={CloseIcon} className={cls.ResetIcon} />
));

const SubmitIconComponent = memo(() => <Icon Svg={SearchIcon} />);

export const ArticlesFiltersRedesigned = (props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeCategory,
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
                <SearchBox
                    placeholder={t('Пошук')}
                    resetIconComponent={ResetIconComponent}
                    submitIconComponent={SubmitIconComponent}
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
                    sort={sort as ArticleSortField}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
};
