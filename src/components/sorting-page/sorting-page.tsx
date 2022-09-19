import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { swap, delay} from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface INumberProps {
  symbol: number,
  state?: ElementStates
}

export const SortingPage: React.FC = () => {

  const [showArray, setShowArray] = useState<INumberProps[]>([]);
  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('radioSelect');
  const [loader, setLoader] = useState<boolean>(false);

  const isRadioSelected = (value: string): boolean => selectedRadioBtn === value;

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioBtn(event.currentTarget.value);
  };

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

  const bubbleSort = async (arr: INumberProps[], selector: Direction) => {
    setLoader(true);
    
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
          (selector === Direction.Ascending && arr[j].symbol > arr[j + 1].symbol) ||
          (selector === Direction.Descending && arr[j].symbol < arr[j + 1].symbol)
        ) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setShowArray([...arr]);
    setLoader(false);
  }

  const selectionSort = async (arr: INumberProps[], selector: Direction) => {
    setLoader(true);
    
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
        await delay(SHORT_DELAY_IN_MS);
        if (selector === Direction.Ascending && arr[minInd].symbol > arr[j].symbol) {
          minInd = j;
        }
        if (selector === Direction.Descending && arr[maxInd].symbol < arr[j].symbol) {
          maxInd = j;
        }
        arr[j].state = ElementStates.Default;
        setShowArray([...arr]);
      }
      selector === Direction.Ascending && swap(arr, i, minInd);
      selector === Direction.Descending && swap(arr, i, maxInd);
      arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setShowArray([...arr]);
    setLoader(false);
  }

  const onClickBubbleSortAsc = () => {
    bubbleSort(showArray, Direction.Ascending)
  }

  const onClickBubbleSortDesc = () => {
    bubbleSort(showArray, Direction.Descending)
  }

  const onClickSelectionSortAsc = () => {
    selectionSort(showArray, Direction.Ascending)
  }

  const onClickSelectionSortDesc = () => {
    selectionSort(showArray, Direction.Descending)
  }
  
  // 2 в 1 по возрастанию
  const onClickSortAsc = () => {
    isRadioSelected('radioBubble') ? onClickBubbleSortAsc() : onClickSelectionSortAsc()
  }

  // 2 в 1 по убыванию
  const onClickSortDesc = () => {
    isRadioSelected('radioBubble') ? onClickBubbleSortDesc() : onClickSelectionSortDesc()
  }
  
  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.main}>
        <div className={styles.radiobutton}>
          <RadioInput 
            label="Выбор" 
            value="radioSelect"
            checked={isRadioSelected("radioSelect")}
            onChange={changeValue}
          />
          <RadioInput 
            label="Пузырёк"
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
            disabled={loader}           
          />
          <Button 
            onClick={onClickSortDesc}
            text='По убыванию'
            sorting={Direction.Descending}
            disabled={loader}            
          />
        </div>
        <Button 
          onClick={onArrayGenerate}
          text='Новый массив'
          disabled={loader}
        />
      </section>

      <section className={styles.columns}>
      {
        showArray.map((item, index) => {
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
};