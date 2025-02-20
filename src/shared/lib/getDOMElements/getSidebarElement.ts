import { toggleFeatures } from '../features';

/**
 * Retrieves the sidebar element based on feature flag.
 */
export const getSidebarElement = (): HTMLElement | null =>
    toggleFeatures({
        name: 'isAppRedesigned',
        on: () => document.querySelector('[data-testid="sidebar-wrap"]'),
        off: () => document.querySelector('[data-testid="sidebar"]'),
    });


