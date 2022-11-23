import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { delay } from "../../utils/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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
}

