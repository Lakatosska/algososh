import React, { useCallback, useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [showValue, setShowValue] = useState<number[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    onButtonClick();
  };

  const onButtonClick = useCallback(() => {
    const inputNumber = Number(inputValue)
    let i = 0
    let res: number[] = []

    const fibonacciInterval = setInterval(() => {
      
      if (i >= inputNumber) {
        clearInterval(fibonacciInterval)
        setLoader(false);
      }

      if (i < 1) {
        res = [1]
      } else if (i < 2) {
        res = [1, 1]
      } else {
        res.push(res[i - 1] + res[i - 2])
      }

      i++
      setShowValue([...res])
    }, SHORT_DELAY_IN_MS)
  }, [inputValue])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.main} onSubmit={(e) => handleSubmit(e)}>
        <Input 
          isLimitText
          max={19}
          type=''
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <Button 
          type='submit'
          text='Рассчитать'
          isLoader={loader}
        />
      </form>
      <div className={styles.circles}>
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
      </div>
    </SolutionLayout>
  );
}