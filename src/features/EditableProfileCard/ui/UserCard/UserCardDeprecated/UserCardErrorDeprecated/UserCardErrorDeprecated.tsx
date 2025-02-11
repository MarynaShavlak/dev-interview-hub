import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack } from '@/shared/ui/common/Stack';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import cls from '../UserCardDeprecated.module.scss';

export const UserCardErrorDeprecated = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.UserCard, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Виникла помилка при завантаженні даних користувача')}
                text={t('Спробуйте оновити сторінку')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};
