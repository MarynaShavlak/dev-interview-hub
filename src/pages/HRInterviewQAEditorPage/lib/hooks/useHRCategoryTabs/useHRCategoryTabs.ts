import { useTranslation } from 'react-i18next';
import {
    HRInterviewQACategoriesEng,
    HRInterviewQACategoriesUkr,
    HRInterviewQACategory,
    HRInterviewQASubcategory,
} from '@/entities/HRInterviewQA';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export const useHRCategoryTabs = () => {
    const { t, i18n } = useTranslation('hrQuestions');
    const lang = i18n.language;
    const HRInterviewQACategories =
        lang === 'uk' || lang === 'ua'
            ? HRInterviewQACategoriesUkr
            : HRInterviewQACategoriesEng;

    const tabs: TabItem[] = [];
    HRInterviewQACategories.forEach((category: HRInterviewQACategory) => {
        category.subcategories.forEach((sub: HRInterviewQASubcategory) => {
            tabs.push({
                value: sub.key,
                label: t(sub.label),
            });
        });
    });

    return tabs;
};
