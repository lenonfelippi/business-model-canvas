// https://on.cypress.io/api

describe('Business Model Canvas Page Test', () => {
  it('visits the url and checks the content', () => {
    cy.visit('/business-model-canvas')

    cy.contains('h1', 'Business Model Canvas Online').should('be.visible')
    cy.contains('span', 'Download PDF').should('be.visible')
    cy.contains('h2', 'Principais parceiros').should('be.visible')
    cy.contains('h2', 'Atividades principais').should('be.visible')
    cy.contains('h2', 'Principais recursos').should('be.visible')
    cy.contains('h2', 'Proposta de valor').should('be.visible')
    cy.contains('h2', 'Relacionamento com os clientes').should('be.visible')
    cy.contains('h2', 'Canais').should('be.visible')
    cy.contains('h2', 'Segmentos de clientes').should('be.visible')
    cy.contains('h2', 'Estrutura de custos').should('be.visible')
    cy.contains('h2', 'Fontes de receitas').should('be.visible')
    cy.contains('h2', 'Atividades principais').should('be.visible')
  })
})
