import { FeatureFlags } from '@/shared/types/featureFlags/featureFlags';
import { splitCamelCase } from '@/shared/lib/text/splitCamelCase/splitCamelCase';

export const getEnabledUserFeatures = (
    features: FeatureFlags | undefined,
): string => {
    if (!features) return 'None';
    return (
        (Object.keys(features) as Array<keyof typeof features>)
            .filter((key) => features[key])
            .map((key) => {
                return splitCamelCase(key)
                    .replace(/is\s|enabled/gi, '')
                    .trim();
            })
            .join(', ') || 'None'
    );
};
