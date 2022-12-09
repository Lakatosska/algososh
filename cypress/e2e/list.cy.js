import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';
import { circleValue, circle, circleBox, colors } from '../utils/constants';

describe('List page works correct', () => {
  beforeEach(() => {
    cy.visit('/list')
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear()
    cy.get('button').contains('Добавить в head').parent().should('be.disabled')
    cy.get('button').contains('Добавить в tail').parent().should('be.disabled')
    cy.get('button').contains('Удалить по индексу').parent().should('be.disabled')
    cy.get('button').contains('Удалить по индексу').parent().should('be.disabled')
  })

  it('Default list renders correct', () => {
    cy.get(circleValue)
      .should('not.be.empty')
      .should('have.length', 6)
    cy.get(circleBox)
      .eq(0).contains('head')
    cy.get(circleBox)
      .eq(5).contains('tail')
    cy.get(circle)
      .each(circle => {
        cy.wrap(circle)
          .should("have.css", "border-color", colors.defaultColor)
      })
    })

  it('Values are adding to the "head" correctly', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get(circleValue)
      .should('have.length', 6)

    cy.get('[data-testid="input_value"]').type('11').should('have.value', '11')

    cy.clock()
    cy.get('button').contains('Добавить в head').click()

    cy.get(circleValue)
      .should('have.length', 7)

    cy.get(circle)
      .first()
      .should("have.css", "border-color", colors.changingColor)
      .contains('11')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .first()
      .should("have.css", "border-color", colors.modifiedColor)
      .contains('11')
    cy.get(circleBox)
      .eq(0).contains('head')

    cy.tick(DELAY_IN_MS)
    cy.get(circle)
      .first()
      .should("have.css", "border-color", colors.defaultColor)
      .contains('11')
    cy.get(circleBox)
      .eq(0).contains('head')
  })

  it('Values are adding to the "tail" correctly', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get(circleValue)
      .should('have.length', 6)

    cy.clock()

    cy.get('[data-testid="input_value"]').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить в tail').click()

    cy.get(circleValue)
      .should('have.length', 7)

    cy.get(circle)
      .eq(5)
      .should("have.css", "border-color", colors.changingColor)
      .contains('22')

    cy.tick(DELAY_IN_MS)
    cy.get(circle)
      .eq(6)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('22')
    cy.get(circleBox)
      .last()
      .contains('tail')
  })

  it('Values are adding by index correctly', () => {
    cy.get('input').clear()

    cy.get(circleValue)
      .should('have.length', 6)
    
    cy.clock()

    cy.get('[data-testid="input_value"]').type('33').should('have.value', '33')
    cy.get('[data-testid="input_index"]').type('1').should('have.value', '1')
    cy.get('button').contains('Добавить по индексу').click()
    
    cy.get(circleValue)
      .should('have.length', 7)

    cy.get(circle)
      .first()
      .should("have.css", "border-color", colors.changingColor)
      .contains('33')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleBox)
      .eq(0).contains('head')
    cy.get(circle)
      .first()
      .should("have.css", "border-color", colors.changingColor)

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)
      .contains('33')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.modifiedColor)
      .contains('33')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.defaultColor)
      .contains('33')    
  })

  it('Values are removing from the "head" correctly', () => {
    cy.clock()

    cy.get('button').contains('Удалить из head').click()
    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)

    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)

    cy.tick(SHORT_DELAY_IN_MS)

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
  })

  it('Values are removing from the "tail" correctly', () => {
    cy.clock()

    cy.get('button').contains('Удалить из tail').click()
    cy.get(circle)
      .last()
      .should("have.css", "border-color", colors.changingColor)

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .should("have.css", "border-color", colors.defaultColor)
  })

  it('Values are removing by index correctly', () => {
    cy.clock()

    cy.get('[data-testid="input_index"]').type('0').should('have.value', '0')
    cy.get('button').contains('Удалить по индексу').click()

    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.changingColor)

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .eq(0)
      .should("have.css", "border-color", colors.defaultColor)
    cy.get(circle)
      .eq(1)
      .should("have.css", "border-color", colors.changingColor)

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circle)
      .should("have.css", "border-color", colors.defaultColor)
  })
})