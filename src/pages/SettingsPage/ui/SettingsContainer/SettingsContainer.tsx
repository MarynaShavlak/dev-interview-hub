import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

export const SettingsContainer = memo(() => {
    const { t } = useTranslation();

    return (
        <VStack gap="16">
            <Text title={t('Налаштування користувача')} />
            <UiDesignSwitcher />
        </VStack>
    );
});
