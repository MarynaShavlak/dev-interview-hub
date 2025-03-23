import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { selectByTestId } from '../../helpers/selectByTestId';
import { User } from '../../../src/entities/User';

export const loginUser = (
    email: string, // Default email
    password: string, // Default password
) => {
    return cy
        .loginWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
            if (!firebaseUser) {
                throw new Error('Firebase user is undefined after login');
            }
            // Set localStorage with the user's UID
            cy.window().then((win) => {
                win.localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    firebaseUser.uid,
                );
            });
        });
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
        interface Chainable {
            loginUser(email: string, password: string): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
