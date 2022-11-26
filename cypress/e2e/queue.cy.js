// 1.	Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
// 2.	Проверьте, правильность добавления элемента в очередь. 
// Необходимо убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно. 
// Не забудьте проверить, что курсоры head и tail отрисовываются корректно.
// 3.	Проверить правильность удаления элемента из очереди.
// 4.	Проверьте поведение кнопки «Очистить». 
//Добавьте в очередь несколько элементов, по нажатию на кнопку «Очистить» длина очереди должна быть равна 0.

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
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('11')

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

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('22')

    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('22')

    // добавить проверку курсоров head и tail

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