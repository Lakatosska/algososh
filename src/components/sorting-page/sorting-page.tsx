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
            text='По возрастанию'
            sorting={Direction.Ascending}
          />
          <Button 
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

/*
{
  showValue.map((item: any, index: any) => {
    return (
      <Circle
        letter={item}
        index={index}
        key={index}
      />
    )
  })
}
*/
