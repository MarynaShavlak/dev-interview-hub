import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('User NOT authenticated', () => {
        it('Navigates to the main page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Navigates to the profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Navigates to a non-existent route', () => {
            cy.visit('/fasfasfasf');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('User authenticated', () => {
        beforeEach(() => {
            cy.logoutUser();
            cy.loginUser();
        });

        it('Navigates to the profile page', () => {
            cy.visit('/profile/4');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Navigates to the articles page', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
