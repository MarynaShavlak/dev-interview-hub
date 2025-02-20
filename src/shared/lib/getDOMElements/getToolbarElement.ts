/**
 * Retrieves the sidebar element based on feature flag.
 */
export const getToolbarElement = (): HTMLElement | null =>
    document.querySelector('[data-testid="toolbar"]');
