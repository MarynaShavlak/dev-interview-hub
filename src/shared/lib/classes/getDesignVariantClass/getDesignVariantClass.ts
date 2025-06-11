import { toggleFeatures } from '../../features';

export const getDesignVariantClass = (redesigned: string, deprecated: string) =>
    toggleFeatures({
        name: 'isAppRedesigned',
        on: () => redesigned,
        off: () => deprecated,
    });
