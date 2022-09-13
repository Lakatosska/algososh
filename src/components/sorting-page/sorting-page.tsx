import React, { useCallback, useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

interface LetterProps {
  symbol: string | number,
  state?: ElementStates
}

type TSelector = 'descending' | 'ascending';

const delay = (
  time: number
) => new Promise(resolve => setTimeout(resolve, time));

const swap = (
  arr: LetterProps[], 
  firstIndex: number, 
  secondIndex: number
): void => {
  const temp = arr[firstIndex].symbol;
  arr[firstIndex].symbol = arr[secondIndex].symbol;
  arr[secondIndex].symbol = temp;
};

export const SortingPage: React.FC = () => {

  const [showArray, setShowArray] = useState<LetterProps[]>([]);
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("radioSelect");

  const isRadioSelected = (value: string): boolean => selectedRadioBtn === value;

  const changeValue = (event: ChangeEvent<HTMLInputElement>): void => setSelectedRadioBtn(event.currentTarget.value);

  useEffect(() => {
    onArrayGenerate();
  }, [])

  //генерация случайного массива
  const onArrayGenerate = () => {
    const getRandomArbitrary = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    }

    const n = getRandomArbitrary(3, 18)
    const randomArr = Array(n).fill(null).map(() => Math.floor(Math.random() * 100))
    
    const arr = randomArr.map(symbol => ({symbol, state: ElementStates.Default}))

    setShowArray(arr)
  }

  const bubbleSort = async (arr: LetterProps[], selector: TSelector) => {
    if (arr[0].state !== ElementStates.Default) {
      arr.forEach(item => item.state = ElementStates.Default);
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setShowArray([...arr]);
        await delay(500);
        if (
          (selector === 'ascending' && arr[j].symbol > arr[j + 1].symbol) ||
          (selector === 'descending' && arr[j].symbol < arr[j + 1].symbol)
        ) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setShowArray([...arr]);
  }

  const selectionSort = async (arr: LetterProps[], selector: TSelector) => {
    if (arr[0].state !== ElementStates.Default) {
      arr.forEach(item => item.state = ElementStates.Default);
    }
    for (let i = 0; i < arr.length - 1; i++) {
      let minInd = i;
      let maxInd = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setShowArray([...arr]);
        await delay(500);
        if (selector === 'ascending' && arr[minInd].symbol > arr[j].symbol) {
          minInd = j;
        }
        if (selector === 'descending' && arr[maxInd].symbol < arr[j].symbol) {
          maxInd = j;
        }
        arr[j].state = ElementStates.Default;
        setShowArray([...arr]);
      }
      selector === 'ascending' && swap(arr, i, minInd);
      selector === 'descending' && swap(arr, i, maxInd);
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setShowArray([...arr]);
  }

  const onClickBubbleSortAsc = () => {
    bubbleSort(showArray, 'ascending')
  }

  const onClickBubbleSortDesc = () => {
    bubbleSort(showArray, 'descending')
  }

  const onClickSelectionSortAsc = () => {
    selectionSort(showArray, 'ascending')
  }

  const onClickSelectionSortDesc = () => {
    selectionSort(showArray, 'descending')
  }
  
  // 2 в 1 по возрастанию
  const onClickSortAsc = () => {
    isRadioSelected("radioBubble") ? onClickBubbleSortAsc() : onClickSelectionSortAsc()
  }

  // 2 в 1 по убыванию
  const onClickSortDesc = () => {
    isRadioSelected("radioBubble") ? onClickBubbleSortDesc() : onClickSelectionSortDesc()
  }
  
  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.main}>
        <div className={styles.radiobutton}>
          <RadioInput 
            label = "Выбор" 
            value="radioSelect"
            checked={isRadioSelected("radioSelect")}
            onChange={changeValue}
          />
          <RadioInput 
            label = "Пузырёк"
            value="radioBubble"
            checked={isRadioSelected("radioBubble")}
            onChange={changeValue} 
          />
        </div>
        <div className={styles.button}>
          <Button 
            onClick={onClickSortAsc}
            text='По возрастанию'
            sorting={Direction.Ascending}
          />
          <Button 
            onClick={onClickSortDesc}
            text='По убыванию'
            sorting={Direction.Descending}
          />
        </div>
        <Button onClick={onArrayGenerate}
          text='Новый массив'
        />
      </section>

      <section className={styles.columns}>
      {
        showArray.map((item: any, index: any) => {
          return (
            <Column
              index={item.symbol}
              key={index}
              state={item.state}
            />
          )
        })
      }
      </section>
    </SolutionLayout>
  )
}