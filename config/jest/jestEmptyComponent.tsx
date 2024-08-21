import React from 'react';

/**
 * The `jestEmptyComponent` is a React functional component that renders an empty `div`.
 * It is used as a placeholder for static asset imports (e.g., SVGs, PNGs) and other modules
 * that need to be mocked during Jest tests.
 *
 * @returns An empty `div` element.
 */

const jestEmptyComponent = function () {
    return <div data-testid="test-icon" />;
};

export default jestEmptyComponent;
