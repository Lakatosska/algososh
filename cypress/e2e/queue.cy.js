import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circleValue, circle, circleBox, colors } from '../utils/constants';

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

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.changingColor)
      .contains('11')
    cy.get(circleBox)
      .eq(0).contains('head')
    cy.get(circleBox)
      .eq(0).contains('tail')

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')

    cy.get('input').type('22').should('have.value', '22');
    cy.get('button').contains('Добавить').click()

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')
    cy.get(circleBox)
      .eq(0).contains('head')

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('22')
    cy.get(circleBox)
      .eq(1).contains('tail')

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

  it('Values are removing from the queue correctly', () => {
    cy.clock();

    cy.get('input').type('11').should('have.value', '11')
    cy.get('button').contains('Добавить').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('input').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить').click()
    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('button').contains('Удалить').click()
    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.changingColor)
      .contains('11')
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('22')
      cy.tick(SHORT_DELAY_IN_MS)

      cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
      cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('22')

      cy.get('button').contains('Удалить').click()
      cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('22')
      cy.tick(SHORT_DELAY_IN_MS)
      cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)

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
    cy.get(circleValue)
      .should('be.empty')
  })
})