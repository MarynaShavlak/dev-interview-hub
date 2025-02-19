import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { useSortBy } from 'react-instantsearch-core';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ArticleSortSelectorProps } from '../ArticleSortSelector';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Box } from '@/shared/ui/common/Box';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { useArticleSortSelector } from '../../../lib/hooks/useArticleSortSelector/useArticleSortSelector';

export const ArticleSortSelectorRedesigned = memo(
    (props: ArticleSortSelectorProps) => {
        const { className, onChangeSort, sort } = props;
        const { t } = useTranslation('articles');
        const { sortTypeOptionsWithOrderValue } = useArticleSortSelector();

        const { refine, options } = useSortBy({
            items: sortTypeOptionsWithOrderValue,
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
                        value={sort as ArticleSortField}
                        onChange={handleSortOptionChange}
                    />
                </VStack>
            </Box>
        );
    },
);
