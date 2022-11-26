// 1.	Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
// перейти на страницу Фибоначчи
// найти инпут
// очистить его
// проверить, что кнопка заблокирована

// 2.	Проверьте, что числа генерируются корректно.

import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

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

    //const result = [1, 1, 2, 3, 5];

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 1)
      .eq(0)
      .contains('1')
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 2)
      .eq(1)
      .contains('1')
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 3)
      .eq(2)
      .contains('2')
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 4)
      .eq(3)
      .contains('3');
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 5)
      .eq(4)
      .contains('5')
  })
})