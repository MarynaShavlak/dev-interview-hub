import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';

import { useEditVocabularyForm } from '../../../lib/hook/useEditVocabularyForm/useEditVocabularyForm';
import cls from '../../AddVocabularyForm/AddLinkForm.module.scss';
import { EditVocabularyFormProps } from '../EditVocabularyForm';

export const EditVocabularyFormRedesigned = memo(
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
                <VStack gap="16" className={cls.inputWrap}>
                    <Input
                        className={cls.input}
                        placeholder={t('Введіть ідіому або слово')}
                        value={vocabText}
                        onChange={handleTextChange}
                        validations={validConfig.title}
                        errors={textErrors}
                    />
                    <Input
                        className={cls.input}
                        placeholder={t('Пояснення або визначення')}
                        value={vocabMeaning}
                        onChange={handleMeaningChange}
                        validations={validConfig.title}
                        errors={meaningErrors}
                    />
                    <Input
                        className={cls.input}
                        placeholder={t('Введіть переклад')}
                        value={vocabTranslation}
                        onChange={handleTranslationChange}
                        validations={validConfig.title}
                        errors={translationErrors}
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
                    variant="save"
                >
                    {t('Зберегти')}
                </Button>
                <Button onClick={onCancel} variant="cancel">
                    {t('Відмінити')}
                </Button>
            </HStack>
        );
    },
);
