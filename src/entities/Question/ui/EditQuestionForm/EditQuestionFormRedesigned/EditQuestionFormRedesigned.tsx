import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

import { HStack } from '@/shared/ui/common/Stack';
import { EditQuestionFormProps } from '../EditQuestionForm';
import { useEditQuestionForm } from '../../../lib/hook/useEditQuestionForm/useEditQuestionForm';

export const EditQuestionFormRedesigned = memo(
    (props: EditQuestionFormProps) => {
        const { t } = useTranslation('articleDetails');
        const { question, onCancel, onSave } = props;

        const {
            questionText,
            handleQuestionTextChange,
            submitQuestionTextChange,
            hasInputErrors,
            validConfig,
        } = useEditQuestionForm({
            question,
            onSave,
        });

        return (
            <HStack
                data-testid="AddQuestionForm"
                justify="between"
                align="end"
                max
                gap="16"
            >
                <Input
                    value={questionText}
                    data-testid="AddQuestionForm.Input"
                    onChange={handleQuestionTextChange}
                    validations={validConfig.title}
                />
                <Button
                    data-testid="AddQuestionForm.Button"
                    onClick={submitQuestionTextChange}
                    disabled={!questionText || hasInputErrors}
                    variant="save"
                >
                    {t('Зберегти')}
                </Button>
                <Button
                    data-testid="AddQuestionForm.Button"
                    onClick={onCancel}
                    variant="cancel"
                >
                    {t('Відмінити')}
                </Button>
            </HStack>
        );
    },
);
