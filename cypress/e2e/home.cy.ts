// https://on.cypress.io/api

describe('Home Page Test', () => {
  it('visits the app root url and checks the hero content', () => {
    cy.visit('/')

    cy.contains('h1', 'Transforme suas ideias em ação:').should('be.visible')

    cy.contains('Criar Meu Business Model Canvas')
      .should('be.visible')
      .and('have.attr', 'href', '/business-model-canvas')

    cy.get('img[alt="TO DO"]').should('be.visible')
  })
})
