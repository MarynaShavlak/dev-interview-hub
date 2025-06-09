import { useTranslation } from 'react-i18next';
import {
    HRInterviewQACategoriesEng,
    HRInterviewQACategoriesUkr,
} from '@/entities/HRInterviewQA';

export const useHRCategoryTabs = () => {
    const { t, i18n } = useTranslation('hrQuestions');
    const lang = i18n.language;
    const HRInterviewQACategories =
        lang === 'uk' || lang === 'ua'
            ? HRInterviewQACategoriesUkr
            : HRInterviewQACategoriesEng;
    //
    // const tabs: TabItem[] = [];
    // HRInterviewQACategories.forEach((category: HRInterviewQACategory) => {
    //     category.subcategories.forEach((sub: HRInterviewQASubcategory) => {
    //         tabs.push({
    //             value: sub.key,
    //             label: t(sub.label),
    //         });
    //     });
    // });
    //
    // return tabs;
    return HRInterviewQACategories.map((category) => ({
        groupLabel: t(category.label),
        tabs: category.subcategories.map((sub) => ({
            value: sub.key,
            label: t(sub.label),
        })),
    }));
};
