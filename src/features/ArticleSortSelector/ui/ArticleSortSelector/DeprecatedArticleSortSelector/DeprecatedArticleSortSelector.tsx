import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import {
    useOrderOptions,
    useSortFieldOptions,
} from '../../../lib/hooks/useOptions';
import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Select } from '@/shared/ui/deprecated/Select';
import cls from '../ArticleSortSelector.module.scss';

export const DeprecatedArticleSortSelector = memo(
    (props: ArticleSortSelectorProps) => {
        const { className, onChangeOrder, onChangeSort, order, sort } = props;
        const { t } = useTranslation('articles');

        const rawOrderOptions = useOrderOptions();
        const orderOptions = useMemo(() => rawOrderOptions, [rawOrderOptions]);

        const rawSortFieldOptions = useSortFieldOptions(order);
        const sortFieldOptions = useMemo(
            () => rawSortFieldOptions,
            [rawSortFieldOptions],
        );

        return (
            <div
                className={classNames(cls.ArticleSortSelector, {}, [className])}
            >
                <Select<ArticleSortField>
                    options={sortFieldOptions}
                    label={t('Сортувати ПО')}
                    value={sort}
                    onChange={onChangeSort}
                />
                <Select
                    options={orderOptions}
                    label={t('по')}
                    value={order}
                    onChange={onChangeOrder}
                    className={cls.order}
                />
            </div>
        );
    },
);
