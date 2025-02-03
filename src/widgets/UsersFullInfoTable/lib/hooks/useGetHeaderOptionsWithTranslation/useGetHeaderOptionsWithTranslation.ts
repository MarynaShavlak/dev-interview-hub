import { useTranslation } from 'react-i18next';
import { UsersTableInfo } from '../../../model/types/usersTableInfo';
import { generateHeaderOptionsWithColors } from '../../helpers/getData/generateHeaderOptionsMapping/generateHeaderOptionsWithColors';

export const useGetHeaderOptionsWithTranslation = (data: UsersTableInfo[]) => {
    const { t } = useTranslation('profile');
    const headerOptionsMapping = generateHeaderOptionsWithColors(data);
    return {
        [t('Аватар')]: headerOptionsMapping.avatar,
        [t("Ім'я користувача")]: headerOptionsMapping.username,
        [t('Email')]: headerOptionsMapping.email,
        [t("Ім'я")]: headerOptionsMapping.firstname,
        [t('Прізвище')]: headerOptionsMapping.lastname,
        [t('Вік')]: headerOptionsMapping.age,
        [t('Місто')]: headerOptionsMapping.city,
        [t('Країна')]: headerOptionsMapping.country,
        [t('Кількість статей')]: headerOptionsMapping.articlesQuantity,
        [t('Роль')]: headerOptionsMapping.role,
    };
};
