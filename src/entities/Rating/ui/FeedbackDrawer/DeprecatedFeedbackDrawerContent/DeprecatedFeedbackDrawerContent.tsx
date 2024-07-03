import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedbackProps } from '../../FeedbackContainer/FeedbackContainer';
import { Button, ButtonSize } from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';

export const DeprecatedFeedbackDrawerContent = memo(
    (props: Partial<FeedbackProps>) => {
        const { t } = useTranslation();
        const { feedbackTitle, setFeedback, feedback, onAccept } = props;

        return (
            <>
                <Text title={feedbackTitle} />
                <Input
                    value={feedback}
                    onChange={setFeedback}
                    placeholder={t('Ваш відгук')}
                />
                <Button fullWidth onClick={onAccept} size={ButtonSize.L}>
                    {t('Відправити')}
                </Button>
            </>
        );
    },
);
