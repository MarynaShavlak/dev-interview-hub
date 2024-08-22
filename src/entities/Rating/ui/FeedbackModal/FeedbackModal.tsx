import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { FeedbackProps } from '../FeedbackContainer/FeedbackContainer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

export const FeedbackModal = memo((props: FeedbackProps) => {
    const {
        isOpen,
        onClose,
        feedbackTitle,
        setFeedback,
        feedback,
        onSubmitFeedback,
        'data-testid': dataTestId,
    } = props;
    const { t } = useTranslation();
    const sendButtonText = t('Відправити');
    const inputPlaceholderText = t('Ваш відгук');
    const closeButtonText = t('Закрити');

    return (
        <Modal isOpen={isOpen} lazy onClose={onClose} data-testid={dataTestId}>
            <VStack max gap="32">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <>
                            <Text title={feedbackTitle} />
                            <Input
                                value={feedback}
                                onChange={setFeedback}
                                placeholder={inputPlaceholderText}
                                data-testid="feedback-input"
                            />
                            <HStack max gap="16" justify="end">
                                <Button
                                    onClick={onClose}
                                    variant="cancel"
                                    data-testid="cancel-feedback-btn"
                                >
                                    {closeButtonText}
                                </Button>
                                <Button
                                    variant="save"
                                    onClick={onSubmitFeedback}
                                    data-testid="submit-feedback-btn"
                                >
                                    {sendButtonText}
                                </Button>
                            </HStack>
                        </>
                    }
                    off={
                        <>
                            <TextDeprecated title={feedbackTitle} />
                            <InputDeprecated
                                value={feedback}
                                onChange={setFeedback}
                                placeholder={inputPlaceholderText}
                            />
                            <HStack max gap="16" justify="end">
                                <ButtonDeprecated
                                    onClick={onClose}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {closeButtonText}
                                </ButtonDeprecated>
                                <ButtonDeprecated onClick={onSubmitFeedback}>
                                    {sendButtonText}
                                </ButtonDeprecated>
                            </HStack>
                        </>
                    }
                />
            </VStack>
        </Modal>
    );
});
