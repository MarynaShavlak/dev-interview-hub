import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack } from '@/shared/ui/common/Stack';
import { EditLinkFormProps } from '../EditLinkForm';
import { useEditLinkForm } from '../../../lib/hook/useEditLinkForm/useEditLinkForm';

export const EditLinkFormRedesigned = memo((props: EditLinkFormProps) => {
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
            />
            <Button
                onClick={submitLinkTextChange}
                disabled={!linkText || hasInputErrors}
                variant="save"
            >
                {t('Зберегти')}
            </Button>
            <Button onClick={onCancel} variant="cancel">
                {t('Відмінити')}
            </Button>
        </HStack>
    );
});
