import { useTranslation } from 'react-i18next';
import React, { memo, useMemo } from 'react';
import { useSortBy } from 'react-instantsearch-core';
import {
    useOrderOptions,
    useSortFieldOptions,
} from '../../../lib/hooks/useOptions';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { SortOrder } from '@/shared/types/sortOrder';

export const RedesignedArticleSortSelector = memo(
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

        const { refine, currentRefinement, options } = useSortBy({
            items: sortFieldOptions,
        });

        const handleSortOptionChange = (sort: ArticleSortField) => {
            onChangeSort(sort);
            refine(sort);
            console.log(`Sorting changed to: ${sort}`); // Custom callback
        };

        const handleSortOrderChange = (newOrder: SortOrder) => {
            // console.log('previews order in toogle', order);
            onChangeOrder(newOrder);
            // console.log('updated order in toogle', newOrder);
            const sortField = sort.split('_')[1];
            const updatedSort = `articles_${sortField}_${newOrder}`;
            console.log(`updatedSort: ${updatedSort}`);
            refine(updatedSort);
        };

        const additionalClasses = getFlexClasses({
            align: 'center',
            hStack: true,
        });
        return (
            <Box
                className={classNames('', {}, [
                    ...additionalClasses,
                    className,
                ])}
            >
                <VStack gap="8">
                    <Text text={t('Сортувати ПО')} />

                    <ListBox
                        items={options}
                        value={sort}
                        onChange={handleSortOptionChange}
                    />

                    <ListBox
                        items={orderOptions}
                        value={order}
                        onChange={handleSortOrderChange}
                    />
                </VStack>
            </Box>
        );
    },
);

// export const RedesignedArticleSortSelector = memo(
//     (props: ArticleSortSelectorProps) => {
//         const { className, onChangeOrder, onChangeSort, order, sort } = props;
//         const { t } = useTranslation('articles');
//
//         const rawOrderOptions = useOrderOptions();
//         const orderOptions = useMemo(() => rawOrderOptions, [rawOrderOptions]);
//
//         const rawSortFieldOptions = useSortFieldOptions();
//         const sortFieldOptions = useMemo(
//             () => rawSortFieldOptions,
//             [rawSortFieldOptions],
//         );
//         return (
//             <div
//                 className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
//                     className,
//                 ])}
//             >
//                 <VStack gap="8">
//                     <Text text={t('Сортувати ПО')} />
//                     <ListBox
//                         items={sortFieldOptions}
//                         value={sort}
//                         onChange={onChangeSort}
//                     />
//                     <ListBox
//                         items={orderOptions}
//                         value={order}
//                         onChange={onChangeOrder}
//                     />
//                 </VStack>
//             </div>
//         );
//     },
// );

// const SortBy: React.FC = () => {
//     const { refine, currentRefinement, options } = useSortBy({
//         items: [
//             { value: 'instant_search', label: 'Default' },
//             { value: 'instant_search_price_asc', label: 'Price Ascending' },
//             { value: 'instant_search_price_desc', label: 'Price Descending' },
//         ],
//     });
//
//     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const selectedValue = event.target.value;
//         refine(selectedValue);
//         console.log(`Sorting changed to: ${selectedValue}`); // Custom callback
//     };
//
//     return (
//         <select value={currentRefinement} onChange={handleChange}>
//             {options.map((item) => (
//                 <option key={item.value} value={item.value}>
//                     {item.label}
//                 </option>
//             ))}
//         </select>
//     );
// };
