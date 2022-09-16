import React, { useCallback, useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

interface ILetterProps {
  symbol: string,
  state?: ElementStates
}

export const StringComponent: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [showValue, setShowValue] = useState<ILetterProps[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    onButtonClick();
  };

  const onButtonClick = useCallback(() => {
    const inputs = inputValue.split('').map(item=> {
      return {
        symbol: item,
        state: ElementStates.Default
      }
    })
    
    setShowValue(inputs)

    let arr = [...inputs]

    for(let i = 0; i < arr.length/2; i++) {
      setTimeout(() => {

        let start = i;
        let end = arr.length - 1 - start;
        arr[start].state = ElementStates.Changing;
        arr[end].state = ElementStates.Changing;
        setShowValue([...arr]);

        setTimeout(() => {
          let swapedSymbol = arr[start].symbol;
          arr[start] = {
            symbol: arr[end].symbol,
            state: ElementStates.Modified,
          };
          arr[end] = {
            symbol: swapedSymbol,
            state: ElementStates.Modified,
          }
          setShowValue([...arr]);
          setLoader(false);
        }, DELAY_IN_MS);

      }, DELAY_IN_MS * i);
    }
  }, [inputValue])

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <Input 
          maxLength={11}
          isLimitText
          onChange = {(e) => setInputValue(e.currentTarget.value)}
        />
        <Button
          type='submit'
          text='Развернуть'
          isLoader={loader}
        />
      </form>
      <div className={styles.circles}>
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
      </div>
    </SolutionLayout>
  )
}