import { useTranslation } from 'react-i18next';

import { generateHeaderOptionsMapping } from '../../utilities/generateHeaderOptionsMapping/generateHeaderOptionsMapping';
import { Vocabulary } from '@/entities/Vocabulary';

export const useGetHeaderOptionsWithTranslation = (data: Vocabulary[]) => {
    const { t } = useTranslation('english');

    const headerOptionsMapping = generateHeaderOptionsMapping(data);

    return {
        [t('Ідіома')]: headerOptionsMapping.text,
        [t('Пояснення')]: headerOptionsMapping.meaning,
        [t('Переклад')]: headerOptionsMapping.translation,
    };
};
