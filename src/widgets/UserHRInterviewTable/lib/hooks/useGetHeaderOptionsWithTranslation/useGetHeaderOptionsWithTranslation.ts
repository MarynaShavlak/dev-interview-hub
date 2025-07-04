import { useTranslation } from 'react-i18next';

import { generateHeaderOptionsMapping } from '../../utilities/generateHeaderOptionsMapping/generateHeaderOptionsMapping';
import { HRInterviewQA, useHRCategoryTabs } from '@/entities/HRInterviewQA';

export const useGetHeaderOptionsWithTranslation = (data: HRInterviewQA[]) => {
    const { t } = useTranslation('articleDetails');
    const tabs = useHRCategoryTabs();
    const headerOptionsMapping = generateHeaderOptionsMapping(data, tabs);

    return {
        [t('Категорії')]: headerOptionsMapping.category,
        [t('Дата створення')]: headerOptionsMapping.createdAt,
        [t('Id')]: headerOptionsMapping.id,
        [t('Питання')]: headerOptionsMapping.title,
    };
};
