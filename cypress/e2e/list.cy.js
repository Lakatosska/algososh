// •	Проверьте, что если в инпуте пусто, то кнопка добавления недоступна, 
// кнопки добавления по индексу и удаления по индексу недоступны тоже.
// •	Проверьте корректность:
// o	отрисовки дефолтного списка.
// o	добавления элемента в head.
// o	добавления элемента в tail.
// o	добавления элемента по индексу.
// o	удаления элемента из head.
// o	удаления элемента из tail.
// o	удаления элемента по индексу.



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

  it('Logic performs correct', () => {
    // отрисовка дефолтного списка



  })

})