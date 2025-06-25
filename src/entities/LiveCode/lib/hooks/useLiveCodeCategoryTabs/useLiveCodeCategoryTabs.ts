import { useTranslation } from 'react-i18next';

import { TabItem } from '@/shared/ui/redesigned/Tabs';
import {
    LiveCodeCategoriesEng,
    LiveCodeCategoriesUkr,
} from '../../../model/data/categories';

export const useLiveCodeCategoryTabs = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const LiveCodeCategories =
        lang === 'uk' || lang === 'ua'
            ? LiveCodeCategoriesUkr
            : LiveCodeCategoriesEng;

    const tabs: TabItem[] = LiveCodeCategories.map(({ key, value }) => ({
        value: key,
        label: t(value),
    }));

    return tabs;
};
