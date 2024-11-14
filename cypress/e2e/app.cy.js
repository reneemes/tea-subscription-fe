describe('Home Page and Subscriptions View', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'http://localhost:3001/api/v1/subscriptions', {
      status: 200,
      fixture: 'subscriptions'
    })
  });

  it('shows the home page and subscriptions', () => {
    cy.get('h1').should('contain', 'Tea Time')
    cy.get('.search-icon').should('be.visible')
    cy.get('#site-search').should('be.visible')

    cy.get('.sub-container > :nth-child(1)').should('be.visible')
    cy.get(':nth-child(1) > .tea-photo').should('be.visible')
    cy.get(':nth-child(1) > h2').should('contain', 'Monthly Green Tea Subscription')
    cy.get('.sub-container > :nth-child(1) > :nth-child(3)').should('contain', 'Subscription ID: 1')
    cy.get('.sub-container > :nth-child(1) > :nth-child(4)').should('contain', 'Status: Active')
    cy.get(':nth-child(1) > button').should('contain', 'Toggle Status')

    cy.get('.sub-container > :nth-child(4)').should('be.visible')
    cy.get(':nth-child(4) > .tea-photo').should('be.visible')
    cy.get(':nth-child(4) > h2').should('contain', 'Biweekly Earl Grey Subscription')
    cy.get('.sub-container > :nth-child(4) > :nth-child(3)').should('contain', 'Subscription ID: 4')
    cy.get('.sub-container > :nth-child(4) > :nth-child(4)').should('contain', 'Status: Inactive')
    cy.get(':nth-child(4) > button').should('contain', 'Toggle Status')
  });

  it('allows live search for subscription title', () => {
    cy.get('#site-search').type('green')
    cy.get('.sub-container').children().should('have.length', 2)
    cy.get('#site-search').type('{backspace}{backspace}{backspace}')
    cy.get('.sub-container').children().should('have.length', 3)
  });

  it('holds state with the enter key', () => {
    cy.get('#site-search').type('gREen', '{enter}')
    cy.get('.sub-container').children().should('have.length', 2)
  });

  it('toggles active status of the subscription', () =>{
    cy.intercept('PATCH', `http://localhost:3001/api/v1/subscriptions/${1}`, {
      status: 200,
      fixture: 'toggled'
    })
    cy.get('.sub-container > :nth-child(1) > :nth-child(4)').should('contain', 'Status: Active')
    cy.get(':nth-child(1) > button').click()
    cy.get('.sub-container > :nth-child(1) > :nth-child(4)').should('contain', 'Status: Inactive')
  });
});

describe('Sad-Paths', () => {
  it('shows an error when unable to connect to the server', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/subscriptions', {
      statusCode: 500,
    }).as('get-subscriptions')
    cy.visit('http://localhost:3000/')

    cy.wait('@get-subscriptions')
    cy.get('h2').should('contain', 'Oops! Something went wrong! Please try again in a couple minutes.')
  });

  it('shows a server side error on unable to toggle', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'http://localhost:3001/api/v1/subscriptions', {
      status: 200,
      fixture: 'subscriptions'
    })
    cy.intercept('PATCH', `http://localhost:3001/api/v1/subscriptions/${1}`, {
      status: 500,
      body: {
        "message": 'Oops! Something went wrong! Please try again in a couple minutes.'
      }
    }).as('failed-toggle')

    cy.get('.sub-container > :nth-child(1) > :nth-child(4)').should('contain', 'Status: Active')
    cy.get(':nth-child(1) > button').click()
    cy.wait('@failed-toggle')
    cy.get('h2').should('contain', 'Oops! Something went wrong! Please try again in a couple minutes.')
  });
});
