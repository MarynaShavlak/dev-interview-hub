import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { User } from '@/entities/User';
import { selectByTestId } from '../../helpers/selectByTestId';

export const login = (
    username: string = 'testuser',
    password: string = '123',
) => {
    return cy
        .request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/login`,
            body: {
                username,
                password,
            },
        })
        .then(({ body }) => {
            console.log('body', body);
            window.localStorage.setItem(USER_LOCALSTORAGE_KEY, body.id);
            return body;
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
