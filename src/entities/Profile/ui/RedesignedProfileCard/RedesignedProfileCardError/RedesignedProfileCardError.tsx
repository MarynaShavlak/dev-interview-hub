import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const RedesignedProfileCardError = () => {
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
