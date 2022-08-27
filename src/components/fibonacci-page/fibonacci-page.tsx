import React, { useCallback, useState } from "react";
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
  const [showValue, setShowValue] = useState<NumberProps[]>([])

  const onButtonClick = useCallback(() => {

    let num = Number(inputValue)

    const fibonacci = (num: number) => {
      let res: number[] = [0, 1]
      console.log(res)
    
      for(let i = 2; i <= num; i++) {
    
        const prevNum1 = res[i - 1]
        console.log(prevNum1)
    
        const prevNum2 = res[i - 2]
        console.log(prevNum2)
    
        res.push(prevNum1 + prevNum2)
      }
    
      return res[num] 
    }

    /*
    const inputs = num.map(item => {
      return {
        symbol: item,
        state: ElementStates.Default}
    })

    setShowValue(inputs)
*/


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
      <section>
        {
          showValue.map((item, index) => {
            return (
              <Circle
                letter={item.symbol}
                state={item.state}
                key={index}
              />

            )
          })
        }


      </section>
     
    </SolutionLayout>
  );
};
