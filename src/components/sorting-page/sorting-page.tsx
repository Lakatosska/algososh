import React, { useCallback, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {

  const [showArray, setShowArray] = useState<any>([]);

  const [selectedRadioBtn, setSelectedRadioBtn] = useState("radioSelect");

  const isRadioSelected = (value: string): boolean => selectedRadioBtn === value;

  const changeValue = (event: ChangeEvent<HTMLInputElement>): void => setSelectedRadioBtn(event.currentTarget.value);


  const randomArrayWithState: number[] = []

  //генерация случайного массива
  const onArrayGenerate = () => {
    let n 

    const getRandomArbitrary = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min) + min);
    }

    n = getRandomArbitrary(3, 18)
    //console.log(n)

    const randomArr = Array(n).fill(null).map(() => Math.floor(Math.random() * 100))
    console.log(randomArr)

    /*

    const randomArrayWithState = randomArr.map(item => {
      return {
        index: item,
        state: ElementStates.Default
      }
    })
    */

    setShowArray(randomArr)    
  }

  /*
  //сортировка пузырьком по возрастанию
  const bubbleSortAsc = (array: any) => {
    for(let n = 0; n < array.length; n++) {
      for(let i = 0; i < array.length - 1 - n; i++) {
        if (array[i] > array[i+1]) {
          const temp = array[i]
          array[i] = array[i+1]
          array[i+1] = temp
        }
      }
    }
    console.log(array)
  }
  */

  
  const bubbleSortAsc2 = (array: number[]) => {
    let i = 0;
    let n = 0; //внешний счетчик

    console.log(array.length)

   /*
    const arrValues = array.map(item => {
      return {
        index: item,
        state: ElementStates.Default
      }
    })
    */
    
    const arrValues = [...array]
    
    //const arrValues = [...randomArrayWithState]

    const bubbleSortInterval = setInterval(() => {
      console.log(`i=${i}, n=${n}`)
      i++

      if (i == arrValues.length - n) {
        n++ 
        i = 0
      }

      if (n == arrValues.length - 1) {
        clearInterval(bubbleSortInterval)
      }

      if (arrValues[i] > arrValues[i+1]) {
        const temp = arrValues[i]
        arrValues[i] = arrValues[i+1]
        arrValues[i+1] = temp
      }

      setShowArray([...arrValues])

    }, 500)
  }
  


  const onClickBubbleSortAsc = () => {
    //console.log('click')
    bubbleSortAsc2(showArray)
  }

  //сортировка пузырьком по убыванию
  const bubbleSortDesc = (array: any) => {
    for(let n=0; n < array.length; n++) {
      for(let i=0; i< array.length - 1 - n; i++) {
        if (array[i] < array[i+1]) {
          const temp = array[i]
          array[i] = array[i+1]
          array[i+1] = temp
        }
      }
    }
    console.log(array)
  }

  const onClickBubbleSortDesc = () => {
    bubbleSortDesc(showArray)
  }

  //сортировка выбором по возрастанию
  const selectionSortAsc = (array: any) => {
    for(let n = 0; n < array.length; n++) {
      let max = 0
      let index = 0

      for(let i = 0; i < array.length - n; i++) {
        if (array[i] > max) {
          max = array[i]
          index = i
        }
      }

      const temp = array[array.length - 1 - n]
      array[array.length - 1 - n] = max
      array[index] = temp
    }
    console.log(array)
  
  }

  const onClickSelectionSortAsc = () => {
    selectionSortAsc(showArray)
  }

  //сортировка выбором по убыванию
  const selectionSortDesc = (array: any) => {
    for(let n = 0; n < array.length; n++) {
      let min = 100
      let index = 0

      for(let i = 0; i < array.length - n; i++) {
        if (array[i] < min) {
          min = array[i]
          index = i
        }
      }

      const temp = array[array.length - 1 - n]
      array[array.length - 1 - n] = min
      array[index] = temp
    }
    console.log(array)
  }

  const onClickSelectionSortDesc = () => {
    selectionSortDesc(showArray)
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
             
              index={item}
              key={index}
            />
          )
        })
      }
      </section>
    </SolutionLayout>
  );
};

/*
{
        showArray.map((item: any, index: any) => {
          return (
            <Column
              state={item.state}
              index={item.index}
              key={index}
            />
          )
        })
      }
*/