/**
 * Interface representing the state of the login form.
 *
 * @property {string} username - The username entered in the login form.
 * @property {string} password - The password entered in the login form.
 * @property {boolean} isLoading - Indicates whether the login request is currently being processed.
 * @property {string} [error] - An error message related to the login form. Optional.
 */

export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}
