import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';

interface ImageUploadErrorProps {
    onRetry: () => void;
}

export const ImageUploadError = ({ onRetry }: ImageUploadErrorProps) => {
    const { t } = useTranslation('articleDetails');

    return (
        <VStack gap="24" align="center" max>
            <Text variant="error" text={t('Помилка завантаження файлу')} />
            <Button onClick={onRetry}>{t('Спробувати повторно')}</Button>
        </VStack>
    );
};
