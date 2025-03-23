import firebase from 'firebase/compat';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { selectByTestId } from '../../helpers/selectByTestId';
import { userData } from '../../data/userData';

export const loginUser = (
    email: string, // Default email
    password: string, // Default password
) => {
    const loginEmail = email || userData.email;
    const loginPassword = password || userData.password;
    return cy
        .loginWithEmailAndPassword(loginEmail, loginPassword)
        .then((firebaseUser) => {
            console.log('firebaseUser', firebaseUser);
            if (!firebaseUser) {
                throw new Error('Firebase user is undefined after login');
            }
            return cy.window().then((win) => {
                win.localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    firebaseUser.uid,
                );

                // Use cy.wrap to properly return the Firebase user in the Cypress chain
                return cy.wrap(firebaseUser);
            });
        });
};

export const logoutUser = () => {
    cy.window().then((win) => {
        win.localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    });

    cy.logout();
};

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId));
};

declare global {
    namespace Cypress {
        import User = firebase.User;

        interface Chainable {
            loginUser(email?: string, password?: string): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
            logoutUser(): Chainable<void>;
        }
    }
}
