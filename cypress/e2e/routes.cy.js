//перед тем как проверять роутинг надо открыть само приложение

describe('Routing works correct', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('opening the start page', () => {
    cy.contains('МБОУ АЛГОСОШ');
  })

  it('opening the string page', () => {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
  })

  it('opening the fibonacci page', () => {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  })

  it('opening the sorting page', () => {
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Сортировка массива');
  })

  it('opening the stack page', () => {
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
  })

  it('opening the recursion page', () => {
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
  })

  it('opening the recursion page', () => {
    cy.get('a[href*="/list"]').click();
    cy.contains('Связный список');
  })
})