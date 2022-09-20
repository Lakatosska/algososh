import React, { useState, useRef, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


interface IQueue {
  letter: string;
  state: ElementStates;
}

const queue = new Queue<IQueue>(7);

export const QueuePage: React.FC = () => {

  const queueRef = useRef(queue);

  const [inputValue, setInputValue] = useState<string>('');
  const [showValue, setShowValue] = useState(queueRef.current.elements());
  const [color, setColor] = useState<ElementStates>();  
  const [ind, setInd] = useState<number>();
  const [loaderAdd, setLoaderAdd] = useState<boolean>(false);
  const [loaderRemove, setLoaderRemove] = useState<boolean>(false);

  const head = queueRef.current.getHead();
  const tail = queueRef.current.getTail();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onValueAdd = () => {
    if (!inputValue) return;
    setLoaderAdd(true);

    queueRef.current.enqueue({ letter: inputValue, state: ElementStates.Default });
    setInd(tail + 1);
    setColor(ElementStates.Changing);
    setShowValue(queueRef.current.elements());

    setTimeout(() => {
      setInputValue('');
      setColor(ElementStates.Default);
      setLoaderAdd(false);
    }, SHORT_DELAY_IN_MS); 
  };

  const onValueDelete = () => {
    setLoaderRemove(true);
    setInd(head);
    setColor(ElementStates.Changing);

    setTimeout(() => {
      queueRef.current.dequeue();
      setColor(ElementStates.Default);
      setShowValue(queueRef.current.elements());
      setLoaderRemove(false);  
    }, SHORT_DELAY_IN_MS);
  };

  const onValuesClear = async () => {
    queueRef.current.clear();
    setShowValue(queueRef.current.elements());
  };

  return (
    <SolutionLayout title='Очередь'>
      <section className={styles.form}>
        <div className={styles.input}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={onChange}
            value={inputValue}
          />
          <Button
            onClick={onValueAdd}
            text='Добавить'
            type='submit'
            disabled={!inputValue.length}
            isLoader={loaderAdd}
          />
          <Button 
            text='Удалить'
            onClick={onValueDelete}
            disabled={queue.isEmpty()}
            isLoader={loaderRemove}
          />
        </div>
        <Button 
          text='Очистить'
          onClick={onValuesClear}
          disabled={queue.isEmpty()}
        />
      </section>
      <section className={styles.circles}>
        {showValue?.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item?.letter ? item.letter : ''}
              state={index === ind ? color : item?.state}
              index={index}
              head={item?.letter && index === head ? 'head' : ''}
              tail={item?.letter && index === tail ? 'tail' : ''}
            />
          )
        })}
      </section>
    </SolutionLayout>
  );
};