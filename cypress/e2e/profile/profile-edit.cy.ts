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
        cy.getByTestId('UserCard.firstname').should('have.value', 'Andrii');
        cy.getByTestId('UserCard.lastname').should('have.value', 'Shavlak');
        cy.getByTestId('UserCard.username').should(
            'have.value',
            'andrii_shavlak',
        );
        cy.getByTestId('UserCard.age').should('have.value', '56');
        cy.getByTestId('UserCard.city').should('have.value', 'Kharkiv');
    });

    it('And edits the profile', () => {
        const newName = 'new firstname';
        const newLastname = 'new lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('UserCard.firstname').should('have.value', newName);
        cy.getByTestId('UserCard.lastname').should('have.value', newLastname);
    });
});
