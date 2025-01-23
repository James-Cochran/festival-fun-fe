describe('Schedules Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/users/*/schedules', {
      fixture: 'schedules.json', 
    }).as('getSchedules')
    
    cy.visit('/users/1/schedules')  
  })

  it('should display the title "Schedules"', () => {
    cy.get('h2').should('contain', 'Schedules')  
  })

  it('should display the correct schedule titles', () => {
    cy.wait('@getSchedules')  

    cy.get('.schedule-specifics').first().should('contain', 'Summer Fest')
    cy.get('.schedule-specifics').eq(1).should('contain', 'Winter Vibes')
  })

  it('should display the correct shows under each schedule', () => {
    cy.wait('@getSchedules')  

    
    cy.get('.schedule-specifics').first().find('.show-specifics').should('have.length', 2)
    cy.get('.schedule-specifics').eq(1).find('.show-specifics').should('have.length', 1)

    cy.get('.show-specifics').first().should('contain', 'Sonic Youth - Rock on Park')
    cy.get('.show-specifics').eq(1).should('contain', 'Portishead - Trip Hop on Arena')
    cy.get('.show-specifics').last().should('contain', 'Glen Miller - Jazz on Theater')
  })

  it('should delete a show from a schedule', () => {
    cy.wait('@getSchedules')
    cy.intercept('DELETE', 'http://localhost:3000/api/v1/schedules/1/shows/1').as('deleteShow')
    
    cy.get('.show-specifics').first().should('contain', 'Sonic Youth')
    
    cy.wait('@deleteShow').its('response.statusCode').should('eq', 200)
    
    cy.get('.schedule-specifics').first().find('.show-specifics').should('have.length', 1)
  })

  it('should display an error message when schedules cannot be fetched', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/users/*/schedules', {
      statusCode: 500,  
    }).as('getSchedulesError')

    cy.visit('/users/1/schedules')
    cy.wait('@getSchedulesError')

    cy.get('p').should('contain', 'Failed to fetch schedules.')
  })
})
