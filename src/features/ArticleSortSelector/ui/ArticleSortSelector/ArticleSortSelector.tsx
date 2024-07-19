import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useOrderOptions,
    useSortFieldOptions,
} from '../../lib/hooks/useOptions';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';

import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';

export interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation('articles');
    const rawOrderOptions = useOrderOptions();
    const orderOptions = useMemo(() => rawOrderOptions, [rawOrderOptions]);

    const rawSortFieldOptions = useSortFieldOptions();
    const sortFieldOptions = useMemo(
        () => rawSortFieldOptions,
        [rawSortFieldOptions],
    );

    return (
        <div
            className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
                className,
            ])}
        >
            <VStack gap="8">
                <Text text={t('Сортувати ПО')} />
                <ListBox
                    items={sortFieldOptions}
                    value={sort}
                    onChange={onChangeSort}
                />
                <ListBox
                    items={orderOptions}
                    value={order}
                    onChange={onChangeOrder}
                />
            </VStack>
        </div>
    );
});
