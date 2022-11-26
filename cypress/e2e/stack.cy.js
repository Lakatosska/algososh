// 1.	Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
// 2.	Проверьте правильность добавления элемента в стек. 
// Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
// 3.	Проверить правильность удаления элемента из стека.
// 4.	Проверьте поведение кнопки «Очистить». Добавьте в стек несколько элементов, 
// по нажатию на кнопку «Очистить» длина стека должна быть равна 0.

import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Stack page works correct', () => {
  beforeEach(() => {
    cy.visit('/stack');
  })

  it('if input is empty, action button is disabled', () => {
    cy.get('input').clear();
    cy.get('button').contains('Добавить').parent().should('be.disabled');
  })

  it('Values are adding to the stack correctly', () => {
    cy.get('input').type('11').should('have.value', '11');
    cy.get('button').contains('Добавить').click();

    cy.clock();

    cy.get('[data-testid="circle"]')
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('11')

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="circle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')

    cy.get('input').type('22').should('have.value', '22');
    cy.get('button').contains('Добавить').click();

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('22')

    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('22')
  })

  it('Values are removing from the stack correctly', () => {

    cy.get('input').type('11').should('have.value', '11');
    cy.get('button').contains('Добавить').click();
    cy.get('input').type('22').should('have.value', '22');
    cy.get('button').contains('Добавить').click();

    cy.clock();

    cy.get('[data-testid="circle_value"]')
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 2)

    cy.get('button').contains('Удалить').click();
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('22')
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get('[data-testid="circle_value"]')
      .should('have.length', 1)

      cy.get('button').contains('Удалить').click();
      cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('11')
      cy.tick(SHORT_DELAY_IN_MS);
      cy.get('[data-testid="circle_value"]')
      .should('have.length', 0)
  })

  it('action button "Clear" works correct', () => {
    cy.get('input').clear();
    cy.get('input').type('11').should('have.value', '11');
    cy.get('button').contains('Добавить').click();
    cy.get('input').type('22').should('have.value', '22');
    cy.get('button').contains('Добавить').click();
    cy.get('input').type('33').should('have.value', '33');
    cy.get('button').contains('Добавить').click();

    cy.get('button').contains('Очистить').click();
    cy.get('[data-testid="circle_value"]').should('have.length', 0)

  })
})