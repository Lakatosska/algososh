import { DELAY_IN_MS } from '../../src/constants/delays';
import { circle, colors } from '../utils/constants';

describe ('String page works correct', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('recursion works correct including styles ', () => {
    cy.get('input').type('fox').should('have.value', 'fox')
    cy.get('button').contains('Развернуть').click()

    cy.clock()

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.changingColor)
      .contains('f')

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('o')

    cy.get(circle)
      .eq(2)
      .should("have.css", "border-color", colors.changingColor)
      .contains('x')

    cy.tick(DELAY_IN_MS);

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.modifiedColor)
      .contains('x')

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('o')

    cy.get(circle)
      .eq(2)
      .should("have.css", "border-color", colors.modifiedColor)
      .contains('f')

    cy.tick(DELAY_IN_MS);

    cy.get(circle)
      .each(circle => {
        cy.wrap(circle)
          .should("have.css", "border-color", colors.modifiedColor)
      })
    cy.get(circle)
      .eq(0)
      .contains('x')

    cy.get(circle)
      .eq(1)
      .contains('o')

    cy.get(circle)
      .eq(2)
      .contains('f')
  })
})