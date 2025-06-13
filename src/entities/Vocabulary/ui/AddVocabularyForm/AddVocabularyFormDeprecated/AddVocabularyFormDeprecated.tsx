import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AddVocabularyForm.module.scss';
import { useAddVocabularyForm } from '../../../lib/hook/useAddVocabularyForm/useAddVocabularyForm';
import { AddVocabularyFormProps } from '../AddVocabularyForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

export const AddVocabularyFormDeprecated = memo(
    (props: AddVocabularyFormProps) => {
        const { className, onAddVocabulary } = props;
        const { t } = useTranslation('english');

        const {
            text,
            meaning,
            translation,
            error,
            onTextChange,
            onMeaningChange,
            onTranslationChange,
            onSendHandler,
            wasSubmitted,
        } = useAddVocabularyForm(onAddVocabulary);

        const validConfig = useInputValidationConfig();
        const textErrors = useInputErrors(text, validConfig.title);
        const meaningErrors = useInputErrors(meaning, validConfig.title);
        const translationErrors = useInputErrors(
            translation,
            validConfig.title,
        );

        const hasInputErrors =
            Object.values(textErrors).some(Boolean) ||
            Object.values(meaningErrors).some(Boolean) ||
            Object.values(translationErrors).some(Boolean);

        if (error) return null;

        return (
            <HStack
                justify="between"
                gap="16"
                max
                data-testid="AddVocabularyForm"
                className={classNames(cls.AddLinkForm, {}, [className])}
            >
                <VStack gap="16" className={cls.inputWrap}>
                    <Input
                        className={cls.input}
                        placeholder={t('Введіть ідіому або слово')}
                        value={text}
                        onChange={onTextChange}
                        validations={validConfig.title}
                        errors={wasSubmitted ? textErrors : undefined}
                    />
                    <Input
                        className={cls.input}
                        placeholder={t('Пояснення або визначення')}
                        value={meaning}
                        onChange={onMeaningChange}
                        validations={validConfig.subtitleLink}
                        errors={wasSubmitted ? meaningErrors : undefined}
                    />
                    <Input
                        className={cls.input}
                        placeholder={t('Переклад')}
                        value={translation}
                        onChange={onTranslationChange}
                        validations={validConfig.title}
                        maxLengthIndicator
                        errors={wasSubmitted ? translationErrors : undefined}
                    />
                </VStack>

                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendHandler}
                    data-testid="AddVocabularyForm.Button"
                    disabled={
                        !text || !meaning || !translation || hasInputErrors
                    }
                >
                    {t('Додати')}
                </Button>
            </HStack>
        );
    },
);
