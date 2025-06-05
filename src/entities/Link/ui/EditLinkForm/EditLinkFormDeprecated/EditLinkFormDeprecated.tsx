import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack } from '@/shared/ui/common/Stack';
import { EditLinkFormProps } from '../EditLinkForm';
import { useEditLinkForm } from '../../../lib/hook/useEditLinkForm/useEditLinkForm';

export const EditLinkFormDeprecated = memo((props: EditLinkFormProps) => {
    const { t } = useTranslation('articleDetails');
    const { link, onCancel, onSave } = props;

    const {
        linkText,
        handleLinkTextChange,
        submitLinkTextChange,
        hasInputErrors,
        validConfig,
    } = useEditLinkForm({
        link,
        onSave,
    });

    return (
        <HStack justify="between" align="end" max gap="16">
            <Input
                value={linkText}
                onChange={handleLinkTextChange}
                validations={validConfig.title}
                withBorder
            />
            <Button
                onClick={submitLinkTextChange}
                disabled={!linkText || hasInputErrors}
                theme={ButtonTheme.BACKGROUND}
            >
                {t('Зберегти')}
            </Button>
            <Button onClick={onCancel} theme={ButtonTheme.OUTLINE_RED}>
                {t('Відмінити')}
            </Button>
        </HStack>
    );
});
