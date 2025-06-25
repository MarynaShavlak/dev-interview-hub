import { useTranslation } from 'react-i18next';

import { TabItem } from '@/shared/ui/redesigned/Tabs';
import {
    HRInterviewQACategoriesEng,
    HRInterviewQACategoriesUkr,
} from '../../../model/data/categories';

export const useHRCategoryTabs = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const HRInterviewQACategories =
        lang === 'uk' || lang === 'ua'
            ? HRInterviewQACategoriesUkr
            : HRInterviewQACategoriesEng;

    const tabs: TabItem[] = HRInterviewQACategories.map(({ key, value }) => ({
        value: key,
        label: t(value),
    }));

    return tabs;
};
