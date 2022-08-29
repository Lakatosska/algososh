import React, { useCallback, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {

  const [randomArray, setRandomArray] = useState<any>([])

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

    setRandomArray(randomArr)    
  }

  //сортировка пузырьком по возрастанию
  const bubbleSortAsc = (array: any) => {
    for(let n=0; n < array.length; n++) {
      for(let i=0; i< array.length - 1 - n; i++) {
        if (array[i] > array[i+1]) {
          const temp = array[i]
          array[i] = array[i+1]
          array[i+1] = temp
        }
      }
    }
    console.log(array)
    return array
  }

  const onClickBubbleSortAsc = () => {
    //console.log('click')
    bubbleSortAsc(randomArray)
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
    return array
  }

  const onClickBubbleSortDesc = () => {
    bubbleSortDesc(randomArray)
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
    return array
  }

  const onClickSelectionSortAsc = () => {
    selectionSortAsc(randomArray)
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
    return array
  }

  const onClickSelectionSortDesc = () => {
    selectionSortDesc(randomArray)
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.main}>
        <div className={styles.radiobutton}>
          <RadioInput 
            label = "Выбор" 
          />
          <RadioInput 
            label = "Пузырёк" 
          />
        </div>
        <div className={styles.button}>
          <Button 
            //onClick={onClickBubbleSortAsc}
            onClick={onClickSelectionSortAsc}
            text='По возрастанию'
            sorting={Direction.Ascending}
          />
          <Button 
            //onClick={onClickBubbleSortDesc}
            onClick={onClickSelectionSortDesc}
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
        randomArray.map((item: any, index: any) => {
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