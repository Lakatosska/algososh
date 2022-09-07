import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./utils";


interface IQueue {
  letter: string;
  state: ElementStates;
}

const queue = new Queue<IQueue>();

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState('')
  const [showValue, setShowValue] = useState<IQueue[]>(Array(7).fill({letter: '', state: ElementStates.Default}))
  const [headIndex, setHeadIndex] = useState(-1);
  const [tailIndex, setTailIndex] = useState(-1);

  const render = () => {
    return (
      showValue.map((_, index) => {
        if (queue.elements[index - queue.startPosition]) {
          return queue.elements[index - queue.startPosition]
        }
        return {letter: '', state: ElementStates.Default}
      })
    )
  }

  const onValueAdd = () => {
    queue.enqueue({ letter: inputValue, state: ElementStates.Changing });
    setInputValue('')
    setShowValue(render())

    setTimeout(() => {
      setHeadIndex(queue.head);
      setTailIndex(queue.tail);
      queue.setByIndex(queue.size - 1, {
        letter: inputValue,
        state: ElementStates.Default,
      });
      setShowValue(render());

    }, 500);
  }

  const onValueDelete = () => {
    if (tailIndex === -1) return;
    queue.dequeue();

    let arr = [...showValue];
    arr[headIndex] = { ...arr[headIndex], state: ElementStates.Changing };    
    setShowValue([...arr]);

    setTimeout(() => {
      setHeadIndex(queue.head);
      setTailIndex(queue.tail);
      setShowValue(render());
    }, 500);
  }

  const onValuesClear = () => {
    queue.clear();
    setShowValue(render());
    setHeadIndex(queue.head);
    setTailIndex(queue.tail);
  }

  return (
    <SolutionLayout title="Очередь">
      <section className={styles.form}>
        <div className={styles.input}>
          <Input 
            maxLength={4}
            isLimitText
            onChange={(e) => setInputValue(e.currentTarget.value)}
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

      {
          showValue.map((item: any, index: any) => {
            return (
              <Circle
                letter={item.letter}
                index={index}
                key={index}
                state={item.state}
                head={`${index === headIndex ? 'head' : ''}`}
                tail={`${index === tailIndex ? 'tail' : ''}`}
              />
            )
          })
        } 
      </section>
    </SolutionLayout>
  );
}