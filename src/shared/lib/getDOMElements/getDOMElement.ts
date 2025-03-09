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

/**
 * Retrieves the sidebar element based on feature flag.
 */
export const getToolbarElement = (): HTMLElement | null =>
    document.querySelector('[data-testid="toolbar"]');

export const getPageElement = (): HTMLElement | null =>
    document.querySelector('[data-testid="Page"]');

export const getElementByTestId = (testId: string): HTMLElement | null =>
    document.querySelector(`[data-testid=${testId}]`);
