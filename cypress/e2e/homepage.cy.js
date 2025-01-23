describe('HomePage', () => {
  it('should display the title and navigation buttons', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Festival Fun Admin')

    cy.get('.users').should('exist')
    cy.get('.users').click() 
    cy.url().should('include', '/users') 

    cy.visit('/')

    cy.get('.schedules').should('exist')
    cy.get('.schedules').click()  
    cy.url().should('include', '/schedules')  
  })
})
