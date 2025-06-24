import React, { memo } from 'react';
import { LiveCodeTaskDetailsRedesigned } from './LiveCodeTaskDetailsRedesigned/LiveCodeTaskDetailsRedesigned';
import { LiveCodeTaskDetailsDeprecated } from './LiveCodeTaskDetailsDeprecated/LiveCodeTaskDetailsDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface LiveCodeTaskDetailsProps {
    id?: string;
}

export const LiveCodeTaskDetails = memo((props: LiveCodeTaskDetailsProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<LiveCodeTaskDetailsRedesigned {...props} />}
            off={<LiveCodeTaskDetailsDeprecated {...props} />}
        />
    );
});
