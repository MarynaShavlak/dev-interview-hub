import { memo } from 'react';
import { RedesignedFeedbackDrawerContent } from './RedesignedFeedbackDrawerContent/RedesignedFeedbackDrawerContent';
import { DeprecatedFeedbackDrawerContent } from './DeprecatedFeedbackDrawerContent/DeprecatedFeedbackDrawerContent';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { FeedbackProps } from '../FeedbackContainer/FeedbackContainer';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { VStack } from '@/shared/ui/redesigned/Stack';

export const FeedbackDrawer = memo((props: FeedbackProps) => {
    const { isOpen, onClose } = props;
    return (
        <Drawer isOpen={isOpen} lazy onClose={onClose}>
            <VStack gap="32">
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<RedesignedFeedbackDrawerContent {...props} />}
                    off={<DeprecatedFeedbackDrawerContent {...props} />}
                />
            </VStack>
        </Drawer>
    );
});
