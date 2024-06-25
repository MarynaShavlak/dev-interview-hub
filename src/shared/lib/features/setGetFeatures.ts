import { FeatureFlags } from '@/shared/types/featureFlags';

// FEATURES DO NOT CHANGE DURING THE SESSION, THEY DO NOT HAVE TO BE MADE REACTIVE!
let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
