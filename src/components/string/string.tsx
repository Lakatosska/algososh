import React, { useCallback, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";


interface LetterProps {
  symbol: string,
  state?: ElementStates
}

export const StringComponent: React.FC = () => {

  const [inputValue, setInputValue] = useState('')

  const [showValue, setShowValue] = useState<LetterProps[]>([])

  const onButtonClick = useCallback(() => {

    let inputs = inputValue.split('').map(item=>
      {
        return {
          symbol: item,
          state: ElementStates.Default
        }
      }
    )

    setShowValue(inputs)
    let i = 0

    let x = setInterval(() => {

      let arr = [...inputs]

      arr[i] = {
        symbol: inputs[inputs.length - 1 - i].symbol,
        state: ElementStates.Changing
      }
      arr[arr.length - 1 - i] = {
        symbol: inputs[i].symbol,
        state: ElementStates.Changing
      }

      i = i + 1
      if (i > arr.length/2) {
        clearInterval(x)
      }

      setShowValue(arr)
   
    }, 1000)

  }, [inputValue])


  return (
    <SolutionLayout title="Строка">
      <section className={styles.form}>
    
        <Input 
          maxLength={11}
          isLimitText
          extraClass = "10"
          onChange = {(e) => setInputValue(e.currentTarget.value)}
        />
        <Button onClick={onButtonClick}
          text='Развернуть'
        />
   
      </section>

      <section className={styles.circles}>
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
  )
}