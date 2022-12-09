import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circleValue, circle } from '../utils/constants';

describe('Fibonacci page works correct', () => {
  beforeEach(() => {
    cy.visit('/fibonacci')
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('digits are generated correctly', () => {
    cy.clock()
    cy.get('input').type('4').should('have.value', '4')
    cy.get('button').contains('Рассчитать').click()

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleValue)
      .should('have.length', 1)
      .eq(0)
      .contains('1')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleValue)
      .should('have.length', 2)
      .eq(1)
      .contains('1')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleValue)
      .should('have.length', 3)
      .eq(2)
      .contains('2')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleValue)
      .should('have.length', 4)
      .eq(3)
      .contains('3')
      
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleValue)
      .should('have.length', 5)
      .eq(4)
      .contains('5')
  })
})