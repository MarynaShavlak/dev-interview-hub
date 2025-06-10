import { useTranslation } from 'react-i18next';
import {
    HRInterviewQACategoriesEng,
    HRInterviewQACategoriesUkr,
} from '@/entities/HRInterviewQA';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export const useHRCategoryTabs = () => {
    const { t, i18n } = useTranslation('hrQuestions');
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
