import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Queue page works correct', () => {
  beforeEach(() => {
    cy.visit('/queue')
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear()
    cy.get('button').contains('Добавить').parent().should('be.disabled')
  })

  it('Values are adding to the queue correctly', () => {
    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click()

    cy.clock()

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('11')
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('head')
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('tail')

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-testid="circle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')

    cy.get('input').type('22').should('have.value', '22');
    cy.get('button').contains('Добавить').click()

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('head')

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('22')
    cy.get('[data-testid="circle_container"]')
      .eq(1).contains('tail')

    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('22')
  })

  it('Values are removing from the queue correctly', () => {
    cy.clock();

    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('input').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('button').contains('Удалить').click()
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('11')
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('22')
      cy.tick(SHORT_DELAY_IN_MS)

      cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('22')

      cy.get('button').contains('Удалить').click()
      cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('22')
      cy.tick(SHORT_DELAY_IN_MS)
      cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")

  })

  it('action button "Clear" works correct', () => {
    cy.get('input').clear()
    cy.clock()

    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click()

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('input').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить').click()

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('button').contains('Очистить').click()

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-testid="circle_value"]')
      .should('be.empty')
  })

})