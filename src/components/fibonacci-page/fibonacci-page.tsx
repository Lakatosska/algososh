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

  /*
  useEffect(() => {
    setInterval(() => {
      onButtonClick()
    }, 500);
  }, []);
  */

  const onButtonClick = useCallback(() => {

    const inputNumber = Number(inputValue)

    const fibonacci = (num: number) => {
      let res: number[] = [1, 1]
    
      for(let i = 2; i <= num; i++) {    
        res.push(res[i - 1] + res[i - 2])
      }
    
      return res
    }

    /*
    let x = setInterval(() => {
      const result = fibonacci(inputNumber)
      setShowValue(result)
    }, 500)
    return () => clearInterval(x);
    */

    const result = fibonacci(inputNumber)
    console.log(result)

    setShowValue(result)

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
