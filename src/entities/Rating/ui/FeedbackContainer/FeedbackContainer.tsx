import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { FeedbackDrawer } from '../FeedbackDrawer/FeedbackDrawer';
import { FeedbackModal } from '../FeedbackModal/FeedbackModal';
import { TestProps } from '@/shared/types/tests';

export interface FeedbackProps extends TestProps {
    feedbackTitle?: string;
    onClose: () => void;
    onSubmitFeedback: () => void;
    isOpen: boolean;
    feedback?: string;
    setFeedback: (feedBack: string) => void;
}

export const FeedbackContainer = memo((props: FeedbackProps) => {
    return (
        <>
            <BrowserView>
                <FeedbackModal {...props} data-testid="feedback-modal" />
            </BrowserView>
            <MobileView>
                <FeedbackDrawer {...props} />
            </MobileView>
        </>
    );
});
