import { EditableProfileCard } from '../../src/features/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';

describe('EditableProfileCard.cy.tsx', () => {
    beforeEach(() => {
        cy.login();
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    });

    afterEach(() => {
        cy.resetProfile(USER_ID);
    });

    it('should render profile card with initial data', () => {
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: USER_ID,
                            },
                        },
                    },
                }}
            >
                <EditableProfileCard id={USER_ID} />
            </TestProvider>,
        );
        cy.getByTestId('UserCard.firstname').should('have.value', 'test');
        cy.getByTestId('UserCard.lastname').should('have.value', 'user');
        cy.getByTestId('UserCard.username').should('have.value', 'testuser');
        cy.getByTestId('UserCard.age').should('have.value', 465);
        cy.getByTestId('UserCard.city').should('have.value', 'Kharkiv');
        cy.getByTestId('UserCard.avatar').should(
            'have.value',
            // eslint-disable-next-line max-len
            'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        );
    });

    it('should allow editing and saving profile data', () => {
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: USER_ID,
                            },
                        },
                    },
                }}
            >
                <EditableProfileCard id={USER_ID} />
            </TestProvider>,
        );

        const newName = 'new firstname';
        const newLastname = 'new lastname';
        cy.updateProfile(newName, newLastname);

        cy.getByTestId('UserCard.firstname').should('have.value', newName);
        cy.getByTestId('UserCard.lastname').should('have.value', newLastname);
    });
});
