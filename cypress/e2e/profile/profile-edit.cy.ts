let profileId = '';

describe('User visits the profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            console.log('data', data);
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });

    afterEach(() => {
        cy.resetProfile(profileId);
    });

    it('And the profile loads successfully', () => {
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

    it('And edits the profile', () => {
        const newName = 'new firstname';
        const newLastname = 'new lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('UserCard.firstname').should('have.value', newName);
        cy.getByTestId('UserCard.lastname').should('have.value', newLastname);
    });
});
