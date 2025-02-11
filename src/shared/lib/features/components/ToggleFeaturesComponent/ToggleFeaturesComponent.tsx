import { ReactElement } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
import { getFeatureFlag } from '../../lib/setGetFeatures/setGetFeatures';

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeaturesComponent = (props: ToggleFeaturesProps) => {
    const { on, off, feature } = props;

    if (getFeatureFlag(feature)) {
        return off;
    }

    return off;
};
