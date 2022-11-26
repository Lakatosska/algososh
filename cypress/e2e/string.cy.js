// 1.	Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
// 2.	Проверьте, что строка разворачивается корректно. 
// Важно, чтобы у вас на каждом шаге анимации были проверки на корректность выполненной операции
// и корректность стилей.

// --default-color: #0032ff; rgb(0, 50, 255) синий
// --changing-color: #d252e1; rgb(210, 82, 225) фиолетовый
// --modified-color: #7fe051; rgb(127, 224, 81) зеленый

import { DELAY_IN_MS } from '../../src/constants/delays';

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

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('f')

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('o')

    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('x')

    cy.tick(DELAY_IN_MS);

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('x')

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('o')

    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('f')

    cy.tick(DELAY_IN_MS);

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('x')

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('o')

    cy.get('[data-testid="circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('f')
  })
})