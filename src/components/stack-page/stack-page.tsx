import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";


interface IStack {
  letter: string;
  state: ElementStates;
}

const stack = new Stack<IStack>();

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [showValue, setShowValue] = useState<IStack[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const onValueAdd = () => {
    if (!inputValue) return;
    setLoader(true);

    stack.push({ letter: inputValue, state: ElementStates.Changing });
    setInputValue('')
    setShowValue([...stack.elements]);

    setTimeout(() => {
      stack.setByIndex(stack.size - 1, {
        letter: inputValue,
        state: ElementStates.Default,
      });
      setShowValue([...stack.elements]);
      setLoader(false);
    }, 500);
  }

  const onValueDelete = () => {
    setLoader(true);

    stack.setByIndex(stack.size - 1, {
      letter: stack.elements[stack.size - 1].letter,
      state: ElementStates.Changing,
    });

    setShowValue([...stack.elements]);

    setTimeout(() => {
      stack.pop();
      setShowValue([...stack.elements]);
    }, 500);
    setLoader(false);    
  }

  const onValuesClear = () => {
    stack.clear();
    setShowValue([...stack.elements]);
  }

  return (
    <SolutionLayout title="Стек">
      <section className={styles.form}>
        <div className={styles.input}>
          <Input 
            maxLength={4}
            isLimitText
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
          />
          <Button onClick={onValueAdd}
            text='Добавить'
            disabled={loader}
          />
          <Button onClick={onValueDelete}
            text='Удалить'
            disabled={loader}
          />
        </div>

        <Button onClick={onValuesClear}
          text='Очистить'
        />
      </section>

      <section className={styles.circles}>
        {showValue.length > 0 &&
          showValue.map((item: any, index: any) => {
            return (
              <Circle
                letter={item.letter}
                //index={index}
                key={index}
                state={item.state}
                head={`${index === showValue.length - 1 ? 'top' : ''}`}
              />
            )
          })
        }
      </section>
    </SolutionLayout>
  )
}