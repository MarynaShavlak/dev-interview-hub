import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import cls from '../AddVocabularyForm.module.scss';
import { useAddVocabularyForm } from '../../../lib/hook/useAddVocabularyForm/useAddVocabularyForm';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useInputErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { AddVocabularyFormProps } from '../AddVocabularyForm';

export const AddVocabularyFormRedesigned = memo(
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
        console.log('wasSubmitted', wasSubmitted);

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

        if (error) {
            return null;
        }

        return (
            <Card padding="24" max border="partial">
                <HStack
                    data-testid="AddVocabularyForm"
                    justify="between"
                    align="end"
                    max
                    gap="16"
                    className={classNames(cls.AddLinkFormRedesigned, {}, [
                        className,
                    ])}
                >
                    <VStack gap="16" className={cls.inputWrap}>
                        <Input
                            className={cls.input}
                            label={t('Ідіома або слово')}
                            placeholder={t('Введіть ідіому або слово')}
                            value={text}
                            onChange={onTextChange}
                            validations={validConfig.title}
                            maxLengthIndicator
                            errors={wasSubmitted ? undefined : textErrors}
                        />
                        <Input
                            className={cls.input}
                            label={t('Значення')}
                            placeholder={t('Пояснення або визначення')}
                            value={meaning}
                            onChange={onMeaningChange}
                            validations={validConfig.title}
                            maxLengthIndicator
                            errors={wasSubmitted ? undefined : meaningErrors}
                        />
                        <Input
                            className={cls.input}
                            label={t('Переклад')}
                            placeholder={t('Введіть переклад')}
                            value={translation}
                            onChange={onTranslationChange}
                            validations={validConfig.title}
                            maxLengthIndicator
                            errors={
                                wasSubmitted ? undefined : translationErrors
                            }
                        />
                    </VStack>

                    <Button
                        data-testid="AddVocabularyForm.Button"
                        onClick={onSendHandler}
                        disabled={
                            !text || !meaning || !translation || hasInputErrors
                        }
                    >
                        {t('Додати')}
                    </Button>
                </HStack>
            </Card>
        );
    },
);
