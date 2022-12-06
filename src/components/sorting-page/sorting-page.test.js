import { ElementStates } from '../../types/element-states';
import { Direction } from "../../types/direction";
import { bubbleSortGenerator, selectionSortGenerator } from './utils';

describe('Тестирование алгоритма сортировки пузырьком', () => {

  it('Корректно сортирует пустой массив', () => {
    let generatorAscending = bubbleSortGenerator([], Direction.Ascending);
    let resultArrayAscending = [];
    for (let symbol of generatorAscending) {
      resultArrayAscending = symbol;
    }
    //Object.keys(generatorAscending);
    expect(resultArrayAscending).toEqual([]);

    let generatorDescending = bubbleSortGenerator([], Direction.Descending);
    let resultArrayDescending = [];
    for (let symbol of generatorDescending) {
      resultArrayDescending = symbol;
    }
    expect(resultArrayDescending).toEqual([]);
  });

  it('Корректно сортирует массив из одного элемента.', () => {  
    let generatorAscending = bubbleSortGenerator([{
      symbol: 5,
      state: ElementStates.Default,
    }], Direction.Ascending);
    let arrayAscending = [];
    for(let symbol of generatorAscending) {
      arrayAscending = symbol;
    }
    expect(arrayAscending).toEqual([{
      symbol: 5,
      state: ElementStates.Modified,
    }]);

    let generatorDescending = bubbleSortGenerator([{
      symbol: 5,
      state: ElementStates.Default,
    }], Direction.Descending);
    let arrayDescending = [];
    for(let symbol of generatorDescending) {
      arrayDescending = symbol;
    }
    expect(arrayDescending).toEqual([{
      symbol: 5,
      state: ElementStates.Modified,
    }]);
  });

  it('Корректно сортирует массив из нескольких элементов', () => {
    let generatorAscending = bubbleSortGenerator([
      {
        symbol: 47,
        state: ElementStates.Default,
      },
      {
        symbol: 2,
        state: ElementStates.Default,
      },
      {
        symbol: 33,
        state: ElementStates.Default,
      }], Direction.Ascending);
    let arrayAscending = [];
    for(let symbol of generatorAscending) {
      arrayAscending = symbol;
    }
    expect(arrayAscending).toEqual([
      {
        symbol: 2,
        state: ElementStates.Modified,
      },
      {
        symbol: 33,
        state: ElementStates.Modified,
      },
      {
        symbol: 47,
        state: ElementStates.Modified,
      }]);

    let generatorDescending = bubbleSortGenerator([
      {
        symbol: 47,
        state: ElementStates.Default,
      },
      {
        symbol: 2,
        state: ElementStates.Default,
      },
      {
        symbol: 33,
        state: ElementStates.Default,
      }], Direction.Descending);
    let arrayDescending = [];
    for(let symbol of generatorDescending) {
      arrayDescending = symbol;
    }
    expect(arrayDescending).toEqual([
      {
        symbol: 47,
        state: ElementStates.Modified,
      },
      {
        symbol: 33,
        state: ElementStates.Modified,
      },
      {
        symbol: 2,
        state: ElementStates.Modified,
      }]);
  });
});

describe('Тестирование алгоритма сортировки выбором', () => {
  it('Корректно сортирует пустой массив', () => {
    let generatorAscending = selectionSortGenerator([], Direction.Ascending);
    let arrayAscending = [];
    for(let symbol of generatorAscending) {
      arrayAscending = symbol;
    }
    expect(arrayAscending).toEqual([]);

    let generatorDescending = selectionSortGenerator([], Direction.Descending);
    let arrayDescending = [];
    for(let symbol of generatorDescending) {
      arrayAscending = symbol;
    }
    expect(arrayDescending).toEqual([]);
  });

  it('Корректно сортирует массив из одного элемента', () => {
    let generatorAscending = selectionSortGenerator([{
      symbol: 5,
      state: ElementStates.Default,
    }], Direction.Ascending);
    let arrayAscending = [];
    for(let symbol of generatorAscending) {
      arrayAscending = symbol;
    }

    expect(arrayAscending).toEqual([{
      symbol: 5,
      state: ElementStates.Modified,
    }]);
    let generatorDescending = selectionSortGenerator([{
      symbol: 5,
      state: ElementStates.Default,
    }], Direction.Descending);
    let arrayDescending = [];
    for(let symbol of generatorDescending) {
      arrayDescending = symbol;
    }
    expect(arrayDescending).toEqual([{
      symbol: 5,
      state: ElementStates.Modified,
    }]);
  });

  it('Корректно сортирует массив из нескольких элементов', () => {
    let generatorAscending = selectionSortGenerator([
      {
        symbol: 47,
        state: ElementStates.Default,
      },
      {
        symbol: 2,
        state: ElementStates.Default,
      },
      {
        symbol: 33,
        state: ElementStates.Default,
      }], Direction.Ascending);
    let arrayAscending = [];
    for(let symbol of generatorAscending) {
      arrayAscending = symbol;
    }
    expect(arrayAscending).toEqual([
      {
        symbol: 2,
        state: ElementStates.Modified,
      },
      {
        symbol: 33,
        state: ElementStates.Modified,
      },
      {
        symbol: 47,
        state: ElementStates.Modified,
      }]);

    let generatorDescending = selectionSortGenerator([
      {
        symbol: 47,
        state: ElementStates.Default,
      },
      {
        symbol: 2,
        state: ElementStates.Default,
      },
      {
        symbol: 33,
        state: ElementStates.Default,
      }], Direction.Descending);
    let arrayDescending = [];
    for(let symbol of generatorDescending) {
      arrayDescending = symbol;
    }
    expect(arrayDescending).toEqual([
      {
        symbol: 47,
        state: ElementStates.Modified,
      },
      {
        symbol: 33,
        state: ElementStates.Modified,
      },
      {
        symbol: 2,
        state: ElementStates.Modified,
      }]);
  });
});