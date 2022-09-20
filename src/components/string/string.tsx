import React, { useCallback, useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

interface ILetterProps {
  letter: string,
  state?: ElementStates
}

export const StringComponent: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [showValue, setShowValue] = useState<ILetterProps[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    onButtonClick();
  };

  const onButtonClick = useCallback(() => {
    const inputs = inputValue.split('').map(item=> {
      return {
        letter: item,
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
          let swapedSymbol = arr[start].letter;
          arr[start] = {
            letter: arr[end].letter,
            state: ElementStates.Modified,
          };
          arr[end] = {
            letter: swapedSymbol,
            state: ElementStates.Modified,
          }
          setShowValue([...arr]);
          setLoader(false);
          setInputValue('')
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
          onChange={onChange}
          value={inputValue}
        />
        <Button
          type='submit'
          text='Развернуть'
          isLoader={loader}
          disabled={inputValue.length < 2}
        />
      </form>
      <div className={styles.circles}>
      {
        showValue.map((item, index) => {
          return (
            <Circle 
              letter={item.letter} 
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