import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";


interface ILetterProps {
  symbol: string | number,
  state?: ElementStates
}

interface INumberProps {
  symbol: number,
  state?: ElementStates
}

export const swap = (
  arr: ILetterProps[], 
  firstIndex: number, 
  secondIndex: number
): void => {
  const temp = arr[firstIndex].symbol;
  arr[firstIndex].symbol = arr[secondIndex].symbol;
  arr[secondIndex].symbol = temp;
};

export const randomArray = () => {
  const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const n = getRandomArbitrary(3, 18)
  const randomArr = Array(n).fill(null).map(() => Math.floor(Math.random() * 100))
  
  const arr = randomArr.map(symbol => ({symbol, state: ElementStates.Default}))

  return arr;
};

export function* bubbleSortGenerator(
  arr: INumberProps[], 
  selector: Direction
): Generator<INumberProps[]> {

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      yield [...arr];
      if (
        (selector === Direction.Ascending && arr[j].symbol > arr[j + 1].symbol) || 
        (selector === Direction.Descending && arr[j].symbol < arr[j + 1].symbol)
      ) {
        swap(arr, j, j + 1);
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  yield [...arr];
};

export function* selectionSortGenerator(
  arr: INumberProps[], 
  selector: Direction
): Generator<INumberProps[]> {
  if (arr.length < 1) return [];

  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    let minInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      yield [...arr];
      if (selector === Direction.Ascending && arr[minInd].symbol > arr[j].symbol) {
        minInd = j;
      }
      if (selector === Direction.Descending && arr[maxInd].symbol < arr[j].symbol) {
        maxInd = j;
      }
      arr[j].state = ElementStates.Default;
      yield [...arr];
    }
    selector === Direction.Ascending && swap(arr, i, minInd);
    selector === Direction.Descending && swap(arr, i, maxInd);
    arr[i].state = ElementStates.Modified;
  }
  arr[arr.length - 1].state = ElementStates.Modified;
  yield [...arr];
};