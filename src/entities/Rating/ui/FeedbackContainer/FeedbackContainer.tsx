import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { FeedbackDrawer } from '../FeedbackDrawer/FeedbackDrawer';
import { FeedbackModal } from '../FeedbackModal/FeedbackModal';

export interface FeedbackProps {
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
                <FeedbackModal {...props} />
            </BrowserView>
            <MobileView>
                <FeedbackDrawer {...props} />
            </MobileView>
        </>
    );
});
