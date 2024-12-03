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

const SortBy: React.FC = () => {
    const { refine, currentRefinement, options } = useSortBy({
        items: [
            { value: 'instant_search', label: 'Default' },
            { value: 'instant_search_price_asc', label: 'Price Ascending' },
            { value: 'instant_search_price_desc', label: 'Price Descending' },
        ],
    });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        refine(selectedValue);
        console.log(`Sorting changed to: ${selectedValue}`); // Custom callback
    };

    return (
        <select value={currentRefinement} onChange={handleChange}>
            {options.map((item) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

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

        const { refine, currentRefinement, options } = useSortBy({
            items: [
                { label: 'Views (asc)', value: 'articles_views_asc' },
                {
                    label: 'Creation date (asc)',
                    value: 'articles_createdAt_asc',
                },
                { label: 'Title (asc)', value: 'articles_title_asc' },
            ],
        });

        const handleChange = (sort: ArticleSortField) => {
            onChangeSort(sort);
            refine(sort);
            console.log(`Sorting changed to: ${sort}`); // Custom callback
        };
        console.log('algolia options', options);
        console.log('react options', sortFieldOptions);
        return (
            <div>
                <ListBox
                    items={options}
                    value={sort}
                    onChange={(e) => handleChange(e)}
                />

                <ListBox
                    items={orderOptions}
                    value={order}
                    onChange={onChangeOrder}
                />
            </div>
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
