import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circle, colors } from '../utils/constants';

describe('Stack page works correct', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear()
    cy.get('button').contains('Добавить').parent().should('be.disabled')
  })

  it('Values are adding to the stack correctly', () => {
    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click()

    cy.clock()

    cy.get(circle)
      .should("have.css", "border-color", colors.changingColor)
      .contains('11')

    cy.tick(SHORT_DELAY_IN_MS)

    cy.get(circle)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')

    cy.get('input').type('22').should('have.value', '22');
    cy.get('button').contains('Добавить').click()

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('22')

    cy.tick(SHORT_DELAY_IN_MS)

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('22')
  })

  it('Values are removing from the stack correctly', () => {

    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click()
    cy.get('input').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить').click()

    cy.clock()

    cy.get(circle)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .should('have.length', 2)

    cy.get('button').contains('Удалить').click();
    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('22')
      cy.tick(SHORT_DELAY_IN_MS)
      cy.get(circle)
      .should('have.length', 1)

      cy.get('button').contains('Удалить').click()
      cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.changingColor)
      .contains('11')
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get(circle)
      .should('have.length', 0)
  })

  it('action button "Clear" works correct', () => {
    cy.get('input').clear()
    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click();
    cy.get('input').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить').click()
    cy.get('input').type('33').should('have.value', '33')
    cy.get('button').contains('Добавить').click()

    cy.get('button').contains('Очистить').click()
    cy.get(circle).should('have.length', 0)
  })
})