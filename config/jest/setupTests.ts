// setupTest.ts

/**
 * Imports configuration and polyfills for the testing environment.
 */

/**
 * @testing-library/jest-dom
 * Adds custom Jest matchers for asserting on DOM elements.
 * Example matchers: `toBeInTheDocument`, `toHaveTextContent`.
 * Usage:
 *   expect(element).toBeInTheDocument();
 */

/**
 * regenerator-runtime/runtime
 * Provides runtime support for async/await and generator functions.
 * Ensures compatibility across different environments.
 * Usage:
 *   async function example() {
 *     const data = await fetchData();
 *   }
 */

import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
