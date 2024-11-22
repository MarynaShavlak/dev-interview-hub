import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const RedesignedUserCardError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack justify="center" max>
            <Text
                variant="error"
                title={t('Виникла помилка при завантаженні даних користувача')}
                text={t('Спробуйте оновити сторінку')}
                align="center"
            />
        </HStack>
    );
};
