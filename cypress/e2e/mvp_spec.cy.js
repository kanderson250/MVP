describe('The app loads', () => {
  it('Loads locally', () => {
    cy.visit('/');
  });
});

describe('Visual setup of the game', () => {
  beforeEach(() => {
    cy.intercept('GET', '/starter_letters', { fixture: 'starterLetters.json' });
    cy.visit('/');
  });
  it('Displays the correct center letter', () => {
    cy.get('#letter-3-3').should('have.text', 'Y');
  });
});
