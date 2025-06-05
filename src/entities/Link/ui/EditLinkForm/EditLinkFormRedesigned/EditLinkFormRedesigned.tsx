import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { EditLinkFormProps } from '../EditLinkForm';
import { useEditLinkForm } from '../../../lib/hook/useEditLinkForm/useEditLinkForm';
import cls from '../../AddLinkForm/AddLinkForm.module.scss';

export const EditLinkFormRedesigned = memo((props: EditLinkFormProps) => {
    const { t } = useTranslation('articleDetails');
    const { link, onCancel, onSave } = props;

    const {
        linkText,
        linkLabel,
        handleLinkTextChange,
        handleLinkLabelChange,
        submitLinkTextChange,
        hasInputErrors,
        validConfig,
        linkErrors,
        labelErrors,
    } = useEditLinkForm({
        link,
        onSave,
    });

    return (
        <HStack justify="between" align="end" max gap="16">
            <VStack gap="16" className={cls.inputWrap}>
                <Input
                    className={cls.input}
                    placeholder={t('Вставте посилання')}
                    value={linkText}
                    onChange={handleLinkTextChange}
                    validations={validConfig.subtitleLink}
                    errors={linkErrors}
                />
                <Input
                    className={cls.input}
                    placeholder={t('Введіть назву посилання')}
                    value={linkLabel}
                    onChange={handleLinkLabelChange}
                    validations={validConfig.title}
                    maxLengthIndicator
                    errors={labelErrors}
                />
            </VStack>
            <Button
                onClick={submitLinkTextChange}
                disabled={!linkText || !linkLabel || hasInputErrors}
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
