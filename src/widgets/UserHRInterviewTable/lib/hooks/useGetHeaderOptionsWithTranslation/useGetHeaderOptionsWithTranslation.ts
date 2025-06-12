import { useTranslation } from 'react-i18next';

import { generateHeaderOptionsMapping } from '../../utilities/generateHeaderOptionsMapping/generateHeaderOptionsMapping';
import { HRInterviewQA } from '@/entities/HRInterviewQA';

export const useGetHeaderOptionsWithTranslation = (data: HRInterviewQA[]) => {
    const { t } = useTranslation('articleDetails');
    const headerOptionsMapping = generateHeaderOptionsMapping(data);
    return {
        [t('Категорія')]: headerOptionsMapping.category,
        [t('Дата створення')]: headerOptionsMapping.createdAt,
        [t('Id')]: headerOptionsMapping.id,
        [t('Заголовок статті')]: headerOptionsMapping.title,
    };
};
