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

export const ArticleSortSelectorDeprecated = memo(
    (props: ArticleSortSelectorProps) => {
        const { className, onChangeOrder, onChangeSort, order, sort } = props;
        // console.log('_sort', sort);
        const { t } = useTranslation('articles');

        const rawOrderOptions = useOrderOptions();
        const orderOptions = useMemo(() => rawOrderOptions, [rawOrderOptions]);

        const rawSortFieldOptions = useSortFieldOptions();
        const sortFieldOptions = useMemo(
            () => rawSortFieldOptions,
            [rawSortFieldOptions],
        );

        // console.log('sortFieldOptions', sortFieldOptions);
        const modifiedSortFieldOptions = sortFieldOptions
            .slice(0, 3)
            .map((option) => ({
                value: option.value,
                label: option.label.split(' ')[0],
            }));
        // console.log('modifiedSortFieldOptions', modifiedSortFieldOptions);
        return (
            <div
                className={classNames(cls.ArticleSortSelector, {}, [className])}
            >
                <Select<ArticleSortField>
                    options={modifiedSortFieldOptions}
                    label={t('Сортувати ПО')}
                    value={sort || ArticleSortField.CREATED_ASC}
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
