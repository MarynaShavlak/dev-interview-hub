import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sortOrder';
import { SelectOption } from '@/shared/ui/deprecated/Select';

export const useOrderOptions = () => {
    const { t } = useTranslation('articles');
    return [
        {
            value: 'asc',
            content: t('зростанню'),
        },
        {
            value: 'desc',
            content: t('спаданню'),
        },
    ] as SelectOption<SortOrder>[];
};
export const useSortFieldOptions = () => {
    const { t } = useTranslation('articles');
    return [
        {
            value: ArticleSortField.CREATED,
            content: t('даті створення'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('назві'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('переглядам'),
        },
    ] as SelectOption<ArticleSortField>[];
};
