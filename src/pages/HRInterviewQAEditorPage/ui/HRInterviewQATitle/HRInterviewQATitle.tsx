import React, { memo } from 'react';

import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { HRInterviewQATitleRedesigned } from './HRInterviewQATitleRedesigned/HRInterviewQATitleRedesigned';
import { HRInterviewQATitleDeprecated } from './HRInterviewQATitleDeprecated/HRInterviewQATitleDeprecated';

export interface HRInterviewQATitleProps {
    titleIndex: number;
    errors: {
        hasInputErrors: boolean;
        titleErrors: ValidationErrors;
    };
}

export const HRInterviewQATitle = memo((props: HRInterviewQATitleProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<HRInterviewQATitleRedesigned {...props} />}
            off={<HRInterviewQATitleDeprecated {...props} />}
        />
    );
});
