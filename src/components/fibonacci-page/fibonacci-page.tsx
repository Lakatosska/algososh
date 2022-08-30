import React, { useCallback, useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

interface NumberProps {
  symbol: string,
  state?: ElementStates
}

export const FibonacciPage: React.FC = () => {

  const [inputValue, setInputValue] = useState('')
  const [showValue, setShowValue] = useState<any>([])

  const onButtonClick = useCallback(() => {
    const inputNumber = Number(inputValue)
    let i = 0
    let res: number[] = []
    console.log(res)

    const fibonacciInterval = setInterval(() => {
      
      if (i >= inputNumber) {
        clearInterval(fibonacciInterval)
      }

      if (i < 1) {
        res = [1]
      } else if (i < 2) {
        res = [1, 1]
      } else {
        res.push(res[i - 1] + res[i - 2])
      }

      i++
      console.log(res)
      setShowValue([...res])
    }, 500)
  }, [inputValue])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.main}>
        <Input 
          
          isLimitText
          max={19}
          type=''
          onChange={(e) => setInputValue(e.currentTarget.value)}
        
        />
        <Button 
          onClick={onButtonClick}
          text='Рассчитать'/>
      </section>
      <section className={styles.circles}>
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
      </section>
    </SolutionLayout>
  );
};
