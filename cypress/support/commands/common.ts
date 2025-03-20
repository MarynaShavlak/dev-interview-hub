import { signInWithEmailAndPassword } from 'firebase/auth';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { User } from '../../../src/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';
import { auth } from '../../../json-server/firebase';

export const login = (
    email: string = 'andrii_shavlak@gmail.com', // Default email
    password: string = 'andrii_shavlak2908', // Default password
) => {
    return cy.wrap(null).then(() => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const firebaseUser = userCredential.user;

                window.localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    firebaseUser.uid,
                );

                return firebaseUser;
            })
            .catch((error) => {
                throw new Error(`Firebase login failed: ${error.message}`);
            });
    });
};

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId));
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>;
            getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
