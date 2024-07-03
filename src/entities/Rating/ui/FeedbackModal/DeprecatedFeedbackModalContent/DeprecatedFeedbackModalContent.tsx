import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackProps } from '../../FeedbackContainer/FeedbackContainer';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';

export const DeprecatedFeedbackModalContent = memo(
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
                    <Button onClick={onClose} theme={ButtonTheme.OUTLINE_RED}>
                        {t('Закрити')}
                    </Button>
                    <Button onClick={onAccept}>{t('Відправити')}</Button>
                </HStack>
            </>
        );
    },
);
