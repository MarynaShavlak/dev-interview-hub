import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackProps } from '../../FeedbackContainer/FeedbackContainer';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';

export const RedesignedFeedbackModalContent = memo(
    (props: Partial<FeedbackProps>) => {
        const { t } = useTranslation();
        const { feedbackTitle, setFeedback, feedback, onAccept, onClose } =
            props;

        return (
            <>
                <Text title={feedbackTitle} />
                <Input
                    value={feedback}
                    onChange={setFeedback}
                    placeholder={t('Ваш відгук')}
                />
                <HStack max gap="16" justify="end">
                    <Button onClick={onClose} variant="cancel">
                        {t('Закрити')}
                    </Button>
                    <Button variant="save" onClick={onAccept}>
                        {t('Відправити')}
                    </Button>
                </HStack>
            </>
        );
    },
);
