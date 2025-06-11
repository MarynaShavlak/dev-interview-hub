import { useTranslation } from 'react-i18next';
import { UserArticlesTableInfo } from '../../../model/types/userArticlesTableInfo';
import { generateHeaderOptionsMapping } from '../../utilities/generateHeaderOptionsMapping/generateHeaderOptionsMapping';

export const useGetHeaderOptionsWithTranslation = (
    data: UserArticlesTableInfo[],
) => {
    const { t } = useTranslation('articleDetails');
    const headerOptionsMapping = generateHeaderOptionsMapping(data);
    return {
        [t('Середній рейтинг')]: headerOptionsMapping.averageRating,
        [t('Категорії')]: headerOptionsMapping.categories,
        [t('Коментарі')]: headerOptionsMapping.commentsQuantity,
        [t('Дата створення')]: headerOptionsMapping.createdAt,
        [t('Id')]: headerOptionsMapping.id,
        [t('Заголовок статті')]: headerOptionsMapping.title,
        [t('Автор')]: headerOptionsMapping.user,
        [t('Перегляди')]: headerOptionsMapping.views,
    };
};
