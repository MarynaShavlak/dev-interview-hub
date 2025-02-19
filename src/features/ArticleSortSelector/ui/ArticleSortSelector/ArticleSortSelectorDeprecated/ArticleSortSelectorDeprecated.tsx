import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';

import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ListBox } from '@/shared/ui/deprecated/Popups';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { useArticleSortSelector } from '../../../lib/hooks/useArticleSortSelector/useArticleSortSelector';

export const ArticleSortSelectorDeprecated = memo(
    (props: ArticleSortSelectorProps) => {
        const { className, onChangeOrder, onChangeSort, order, sort } = props;
        const { t } = useTranslation('articles');
        const { orderOptions, sortTypeOptionsWithNoOrder } =
            useArticleSortSelector();
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
                    items={sortTypeOptionsWithNoOrder}
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
            </div>
        );
    },
);
