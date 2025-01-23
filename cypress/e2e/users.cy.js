describe('Users Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/users', {
      fixture: 'users.json',
    }).as('getUsers')
    
    cy.visit('/users')
  })

  it('should display the title "Users List"', () => {
    cy.get('h2').should('contain', 'Users List')
  })

  it('should display users in the correct order', () => {
    cy.wait('@getUsers')

    cy.get('.user-specifics').first().should('contain', 'Bob Johnson')
    cy.get('.user-specifics').eq(1).should('contain', 'Jane Smith')
    cy.get('.user-specifics').last().should('contain', 'John Doe')
  })

  it('should navigate to the user schedules page when a user is clicked', () => {
    cy.get('.user-specifics').first().click()
    cy.url().should('include', '/users/3/schedules')
  })

  it('should show an error message when users cannot be fetched', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/users', {
      statusCode: 500,
    }).as('getUsersError')
    
    cy.visit('/users')
    
    cy.wait('@getUsersError')
    
    cy.get('p').should('contain', 'Failed to fetch users.')
  })
})
