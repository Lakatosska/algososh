import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";

//! убедиться, что в стеке есть элементы перед удалением или если надо вернуть верхний
/*
interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
} 
*/

interface IStack {
  letter: string;
  state: ElementStates;
}

const stack = new Stack<IStack>();

export const StackPage: React.FC = () => {

  const [inputValue, setInputValue] = useState('')
  const [showValue, setShowValue] = useState<any>([])

  const onValueAdd = () => {
    if (!inputValue) return;

    stack.push({ letter: inputValue, state: ElementStates.Changing });
    setInputValue('')
    setShowValue([...stack.elements]);

    setTimeout(() => {
      stack.setByIndex(stack.size - 1, {
        letter: inputValue,
        state: ElementStates.Default,
      });
      setShowValue([...stack.elements]);

    }, 500);
  }

  const onValueDelete = () => {

    stack.setByIndex(stack.size - 1, {
      letter: stack.elements[stack.size - 1].letter,
      state: ElementStates.Changing,
    });

    setShowValue([...stack.elements]);

    setTimeout(() => {
      stack.pop();
      setShowValue([...stack.elements]);
    }, 500);
    
  }

  const onValuesClear = () => {
    stack.clear();
    setShowValue('');
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
          />
          <Button onClick={onValueDelete}
            text='Удалить'
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