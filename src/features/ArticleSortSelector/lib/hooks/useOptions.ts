import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { SelectOption } from '@/shared/ui/deprecated/Select';

/**
 * Custom hook for retrieving localized sorting order options for articles.
 * Utilizes the `useTranslation` hook from `react-i18next` to provide localized content.
 *
 * @returns {SelectOption<SortOrder>[]} An array of sorting order options where each option contains:
 *  * `value`: A string representing the sorting order ('asc' for ascending or 'desc' for descending).
 *  * `content`: A localized string representing the sorting order label in Ukrainian.
 *
 */

export const useOrderOptions = () => {
    const { t } = useTranslation('articles');
    return [
        {
            value: 'asc',
            label: t('зростанню'),
        },
        {
            value: 'desc',
            label: t('спаданню'),
        },
    ] as SelectOption<SortOrder>[];
};

/**
 * Custom hook for retrieving localized article sorting field options.
 * Utilizes the `useTranslation` hook from `react-i18next` to provide localized content.
 *
 * @returns {SelectOption<ArticleSortField>[]} An array of sorting field options where each option contains:
 *  * `value`: A string representing one of the sorting fields (`ArticleSortField.CREATED`, `ArticleSortField.TITLE`, or `ArticleSortField.VIEWS`).
 *  * `content`: A localized string representing the sorting field label in Ukrainian.
 *
 */

export const useSortFieldOptions = () => {
    const { t } = useTranslation('articles');
    return [
        {
            value: ArticleSortField.CREATED,
            label: t('даті створення'),
        },
        {
            value: ArticleSortField.TITLE,
            label: t('назві'),
        },
        {
            value: ArticleSortField.VIEWS,
            label: t('переглядам'),
        },
    ] as SelectOption<ArticleSortField>[];
};
