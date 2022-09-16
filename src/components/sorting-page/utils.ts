import { ElementStates } from "../../types/element-states";

interface ILetterProps {
  symbol: string | number,
  state?: ElementStates
}

export const delay = (
  time: number
) => new Promise(resolve => setTimeout(resolve, time));

export const swap = (
  arr: ILetterProps[], 
  firstIndex: number, 
  secondIndex: number
): void => {
  const temp = arr[firstIndex].symbol;
  arr[firstIndex].symbol = arr[secondIndex].symbol;
  arr[secondIndex].symbol = temp;
};