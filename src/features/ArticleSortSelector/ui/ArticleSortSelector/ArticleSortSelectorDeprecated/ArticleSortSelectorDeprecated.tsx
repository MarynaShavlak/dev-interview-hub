import { useTranslation } from 'react-i18next';
import React, { memo, useMemo } from 'react';
import {
    useOrderOptions,
    useSortFieldOptions,
} from '../../../lib/hooks/useOptions';
import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { ArticleSortField } from '@/entities/Article';
import { ListBoxItem } from '@/shared/ui/deprecated/Popups/ui/ListBox/Option/Option';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export const ArticleSortSelectorDeprecated = memo(
    (props: ArticleSortSelectorProps) => {
        const { className, onChangeOrder, onChangeSort, order, sort } = props;
        // console.log('_sort', sort);
        const { t } = useTranslation('articles');
        console.log('_ArticleSortSelectorDeprecated', sort);
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
            .map((option) => {
                return {
                    value: option.value.split('_')[1],
                    label: option.label.split('   ↑')[0],
                };
            }) as ListBoxItem<ArticleSortField>[];
        console.log('modifiedSortFieldOptions', modifiedSortFieldOptions);
        // const defaultLabel = useGetDefaultSortLabel(sort);

        const flexClasses = getFlexClasses({
            hStack: true,
            align: 'center',
            gap: '8',
        });
        return (
            <div
                className={classNames('', {}, [
                    ...flexClasses,
                    className || '',
                ])}
            >
                <ListBox
                    items={modifiedSortFieldOptions}
                    value={sort}
                    onChange={onChangeSort}
                    label={t('Сортувати ПО')}
                    withBorder
                />
                <ListBox
                    items={orderOptions}
                    value={order}
                    onChange={onChangeOrder}
                    label={t('по')}
                    withBorder
                />

                {/* <Select<ArticleSortField> */}
                {/*    options={modifiedSortFieldOptions} */}
                {/*    label={t('Сортувати ПО')} */}
                {/*    value={sort} */}
                {/*    onChange={onChangeSort} */}
                {/* /> */}
                {/* <Select */}
                {/*    options={orderOptions} */}
                {/*    label={t('по')} */}
                {/*    value={order} */}
                {/*    onChange={onChangeOrder} */}
                {/*    className={cls.order} */}
                {/* /> */}
            </div>
        );
    },
);
