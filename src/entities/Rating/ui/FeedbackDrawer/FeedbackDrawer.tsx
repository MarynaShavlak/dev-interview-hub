import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { FeedbackProps } from '../FeedbackContainer/FeedbackContainer';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
} from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

export const FeedbackDrawer = memo((props: FeedbackProps) => {
    const {
        isOpen,
        onClose,
        feedbackTitle,
        setFeedback,
        feedback,
        onSubmitFeedback,
    } = props;
    const { t } = useTranslation();
    const buttonText = t('Відправити');
    const inputPlaceholderText = t('Ваш відгук');

    return (
        <Drawer isOpen={isOpen} lazy onClose={onClose}>
            <VStack gap="32">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={
                        <>
                            <Text title={feedbackTitle} />
                            <Input
                                value={feedback}
                                onChange={setFeedback}
                                placeholder={inputPlaceholderText}
                            />
                            <Button max onClick={onSubmitFeedback} size="l">
                                {buttonText}
                            </Button>
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
                            <ButtonDeprecated
                                max
                                onClick={onSubmitFeedback}
                                size={ButtonSize.L}
                            >
                                {buttonText}
                            </ButtonDeprecated>
                        </>
                    }
                />
            </VStack>
        </Drawer>
    );
});
