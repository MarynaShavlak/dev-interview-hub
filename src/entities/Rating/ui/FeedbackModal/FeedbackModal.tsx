import { memo } from 'react';
import { RedesignedFeedbackModalContent } from './RedesignedFeedbackModalContent/RedesignedFeedbackModalContent';
import { DeprecatedFeedbackModalContent } from './DeprecatedFeedbackModalContent/DeprecatedFeedbackModalContent';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { FeedbackProps } from '../FeedbackContainer/FeedbackContainer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const FeedbackModal = memo((props: FeedbackProps) => {
    const { isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} lazy onClose={onClose}>
            <VStack max gap="32">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<RedesignedFeedbackModalContent {...props} />}
                    off={<DeprecatedFeedbackModalContent {...props} />}
                />
            </VStack>
        </Modal>
    );
});
