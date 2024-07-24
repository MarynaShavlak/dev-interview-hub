import { useEffect } from 'react';

/**
 * Custom hook to execute a callback function only once when a component is initially mounted.
 * @param {Function} callback - A function to be executed only once when the component is first mounted.
 * The hook checks the environment using the `__PROJECT__` variable to ensure that the callback is not executed in environments such as Storybook or Jest to avoid unnecessary operations.
 * @returns {void}
 *
 */

export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line
    }, []);
}
