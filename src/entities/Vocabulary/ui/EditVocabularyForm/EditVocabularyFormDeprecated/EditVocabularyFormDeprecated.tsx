import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { EditVocabularyFormProps } from '../EditVocabularyForm';
import { useEditVocabularyForm } from '../../../lib/hook/useEditVocabularyForm/useEditVocabularyForm';

export const EditVocabularyFormDeprecated = memo(
    (props: EditVocabularyFormProps) => {
        const { t } = useTranslation('english');
        const { vocabulary, onCancel, onSave } = props;

        const {
            vocabText,
            vocabMeaning,
            vocabTranslation,
            handleTextChange,
            handleMeaningChange,
            handleTranslationChange,
            submitVocabularyChange,
            hasInputErrors,
            validConfig,
            textErrors,
            meaningErrors,
            translationErrors,
        } = useEditVocabularyForm({
            vocabulary,
            onSave,
        });

        return (
            <HStack justify="between" align="end" max gap="16">
                <VStack gap="16">
                    <Input
                        value={vocabText}
                        onChange={handleTextChange}
                        validations={validConfig.title}
                        errors={textErrors}
                        withBorder
                        placeholder={t('Введіть ідіому або слово')}
                    />
                    <Input
                        value={vocabMeaning}
                        onChange={handleMeaningChange}
                        validations={validConfig.title}
                        errors={meaningErrors}
                        withBorder
                        placeholder={t('Пояснення або визначення')}
                    />
                    <Input
                        value={vocabTranslation}
                        onChange={handleTranslationChange}
                        validations={validConfig.title}
                        errors={translationErrors}
                        withBorder
                        placeholder={t('Введіть переклад')}
                    />
                </VStack>

                <Button
                    onClick={submitVocabularyChange}
                    disabled={
                        !vocabText ||
                        !vocabMeaning ||
                        !vocabTranslation ||
                        hasInputErrors
                    }
                    theme={ButtonTheme.BACKGROUND}
                >
                    {t('Зберегти')}
                </Button>
                <Button onClick={onCancel} theme={ButtonTheme.OUTLINE_RED}>
                    {t('Відмінити')}
                </Button>
            </HStack>
        );
    },
);
