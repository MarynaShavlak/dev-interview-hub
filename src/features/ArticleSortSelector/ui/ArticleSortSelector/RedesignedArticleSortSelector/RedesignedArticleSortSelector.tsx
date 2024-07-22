import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import {
    useOrderOptions,
    useSortFieldOptions,
} from '../../../lib/hooks/useOptions';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleSortSelector.module.scss';

export const RedesignedArticleSortSelector = memo(
    (props: ArticleSortSelectorProps) => {
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
    },
);
