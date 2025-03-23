import firebase from 'firebase/compat';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { selectByTestId } from '../../helpers/selectByTestId';

export const loginUser = (
    email: string = 'andrii_shavlak@gmail.com', // Default email
    password: string = 'andrii_shavlak2908', // Default password
) => {
    return cy
        .loginWithEmailAndPassword(email, password)
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
            // Set localStorage with the user's UID
            // cy.window().then((win) => {
            //     win.localStorage.setItem(
            //         USER_LOCALSTORAGE_KEY,
            //         firebaseUser.uid,
            //     );
            // });
        });
};

export const logoutUser = () => {
    cy.window().then((win) => {
        win.localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    });
    // Logout from Firebase using cypress-firebase's cy.logout()
    cy.logout();
};

// export const login = (
//     email: string = 'andrii_shavlak@gmail.com', // Default email
//     password: string = 'andrii_shavlak2908', // Default password
// ) => {
//     return cy.wrap(null).then(() => {
//         return signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const firebaseUser = userCredential.user;
//
//                 window.localStorage.setItem(
//                     USER_LOCALSTORAGE_KEY,
//                     firebaseUser.uid,
//                 );
//                 return fetchUserFromFirestore(firebaseUser.uid);
//             })
//             .then((existingUser) => existingUser)
//             .catch((error) => {
//                 throw new Error(`Firebase login failed: ${error.message}`);
//             });
//     });
// };

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
