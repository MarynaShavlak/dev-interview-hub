import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = {
    isAppRedesigned:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};
// FEATURES DO NOT CHANGE DURING THE SESSION, THEY DO NOT HAVE TO BE MADE REACTIVE!
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags?.[flag];
}
export function getAllFeatureFlags() {
    return featureFlags;
}
