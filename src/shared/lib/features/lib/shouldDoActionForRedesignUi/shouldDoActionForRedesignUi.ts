import { toggleFeatures } from '../toggleFeatures/toggleFeatures';

export const shouldDoActionForRedesignUi = () => {
    return toggleFeatures({
        name: 'isAppRedesigned',
        on: () => false,
        off: () => true,
    });
};
