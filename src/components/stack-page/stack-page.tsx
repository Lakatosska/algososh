import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


interface IStack {
  letter: string;
  state: ElementStates;
}

const stack = new Stack<IStack>();

export const StackPage: React.FC = () => {

  const stackRef = useRef(stack);

  const [inputValue, setInputValue] = useState<string>('');
  const [showValue, setShowValue] = useState<IStack[]>([]);
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [loaderRemove, setLoaderRemove] = useState<boolean>(false);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const onValueAdd = () => {
    if (!inputValue) return null;
    setLoaderAdd(true);

    stackRef.current.push({ letter: inputValue, state: ElementStates.Changing });
    setInputValue('')
    setShowValue([...stackRef.current.elements]);

    setTimeout(() => {
      stackRef.current.setByIndex(stackRef.current.size - 1, {
        letter: inputValue,
        state: ElementStates.Default,
      });
      setShowValue([...stackRef.current.elements]);
      setLoaderAdd(false);
    }, SHORT_DELAY_IN_MS);
  }

  const onValueDelete = () => {
    setLoaderRemove(true);

    stack.setByIndex(stackRef.current.size - 1, {
      letter: stackRef.current.elements[stackRef.current.size - 1].letter,
      state: ElementStates.Changing,
    });

    setShowValue([...stackRef.current.elements]);

    setTimeout(() => {
      stackRef.current.pop();
      setShowValue([...stackRef.current.elements]);
      setLoaderRemove(false); 
    }, SHORT_DELAY_IN_MS);
  }

  const onValuesClear = () => {
    stackRef.current.clear();
    setShowValue([...stackRef.current.elements]);
  }

  return (
    <SolutionLayout title="Стек">
      <section className={styles.form}>
        <div className={styles.input}>
          <Input 
            maxLength={4}
            isLimitText
            onChange={onChange}
            value={inputValue}
          />
          <Button 
            onClick={onValueAdd}
            text='Добавить'
            disabled={!inputValue}
            isLoader={loaderAdd}
          />
          <Button 
            onClick={onValueDelete}
            text='Удалить'
            disabled={!showValue.length}
            isLoader={loaderRemove}
          />
        </div>

        <Button 
          onClick={onValuesClear}
          text='Очистить'
          disabled={!showValue.length}
        />
      </section>

      <section className={styles.circles}>
        {showValue.length > 0 &&
          showValue.map((item, index) => {
            return (
              <Circle
                letter={item.letter}
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