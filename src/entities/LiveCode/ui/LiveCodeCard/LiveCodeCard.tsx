import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { LiveCode } from '../..';
import { LiveCodeCardRedesigned } from './LiveCodeCardRedesigned/LiveCodeCardRedesigned';
import { LiveCodeCardDeprecated } from './LiveCodeCardDeprecated/LiveCodeCardDeprecated';

export interface LiveCodeCardProps {
    className?: string;
    liveCodeTask: LiveCode;
    target?: HTMLAttributeAnchorTarget;
    handleClick?: () => void;
}

export const LiveCodeCard = memo((props: LiveCodeCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<LiveCodeCardRedesigned {...props} />}
            off={<LiveCodeCardDeprecated {...props} />}
        />
    );
});
