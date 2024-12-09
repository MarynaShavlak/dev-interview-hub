import { useTranslation } from 'react-i18next';
import React, { memo, useMemo } from 'react';
import { useSortBy } from 'react-instantsearch-core';
import { useSortFieldOptions } from '../../../lib/hooks/useOptions';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

export const RedesignedArticleSortSelector = memo(
    (props: ArticleSortSelectorProps) => {
        const { className, onChangeOrder, onChangeSort, order, sort } = props;
        const { t } = useTranslation('articles');

        const rawSortFieldOptions = useSortFieldOptions();
        const sortFieldOptions = useMemo(
            () => rawSortFieldOptions,
            [rawSortFieldOptions],
        );

        const { refine, options } = useSortBy({
            items: sortFieldOptions,
        });

        const handleSortOptionChange = (newSort: ArticleSortField) => {
            onChangeSort(newSort);
            refine(newSort);
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
                        value={sort || ArticleSortField.CREATED_ASC}
                        onChange={handleSortOptionChange}
                    />
                </VStack>
            </Box>
        );
    },
);
