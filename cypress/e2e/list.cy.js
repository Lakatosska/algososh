import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';

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
    cy.get('[data-testid="circle_value"]')
      .should('not.be.empty')
      .should('have.length', 6)
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('head')
    cy.get('[data-testid="circle_container"]')
      .eq(5).contains('tail')
    cy.get('[data-testid="circle"]')
      .each(circle => {
        cy.wrap(circle)
          .should("have.css", "border-color", "rgb(0, 50, 255)")
      })
    })

  it('Values are adding to the "head" correctly', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('[data-testid="circle_value"]')
      .should('have.length', 6)

    cy.get('[data-testid="input_value"]').type('11').should('have.value', '11')

    cy.clock()
    cy.get('button').contains('Добавить в head').click()

    cy.get('[data-testid="circle_value"]')
      .should('have.length', 7)

    cy.get('[data-testid="circle"]')
      .first()
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('11')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .first()
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('11')
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('head')

    cy.tick(DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .first()
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('11')
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('head')
  })

  it('Values are adding to the "tail" correctly', () => {
    cy.get('input').clear()
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('[data-testid="circle_value"]')
      .should('have.length', 6)

    cy.clock()

    cy.get('[data-testid="input_value"]').type('22').should('have.value', '22')
    cy.get('button').contains('Добавить в tail').click()

    cy.get('[data-testid="circle_value"]')
      .should('have.length', 7)

    cy.get('[data-testid="circle"]')
      .eq(5)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('22')

    cy.tick(DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .eq(6)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('22')
    cy.get('[data-testid="circle_container"]')
      .last()
      .contains('tail')
  })

  it('Values are adding by index correctly', () => {
    cy.get('input').clear()

    cy.get('[data-testid="circle_value"]')
      .should('have.length', 6)
    
    cy.clock()

    cy.get('[data-testid="input_value"]').type('33').should('have.value', '33')
    cy.get('[data-testid="input_index"]').type('1').should('have.value', '1')
    cy.get('button').contains('Добавить по индексу').click()
    
    cy.get('[data-testid="circle_value"]')
      .should('have.length', 7)

    cy.get('[data-testid="circle"]')
      .first()
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('33')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle_container"]')
      .eq(0).contains('head')
    cy.get('[data-testid="circle"]')
      .first()
      .should("have.css", "border-color", "rgb(210, 82, 225)")

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains('33')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains('33')

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains('33')    
  })

  it('Values are removing from the "head" correctly', () => {
    cy.clock()

    cy.get('button').contains('Удалить из head').click()
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")

    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")

    cy.tick(SHORT_DELAY_IN_MS)

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
  })

  it('Values are removing from the "tail" correctly', () => {
    cy.clock()

    cy.get('button').contains('Удалить из tail').click()
    cy.get('[data-testid="circle"]')
      .last()
      .should("have.css", "border-color", "rgb(210, 82, 225)")

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
  })

  it('Values are removing by index correctly', () => {
    cy.clock()

    cy.get('[data-testid="input_index"]').type('0').should('have.value', '0')
    cy.get('button').contains('Удалить по индексу').click()

    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
    cy.get('[data-testid="circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")

    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('[data-testid="circle"]')
      .should("have.css", "border-color", "rgb(0, 50, 255)")
  })
})