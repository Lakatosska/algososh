import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
} 

export const QueuePage: React.FC = () => {

  const onValueAdd = () => {
    console.log('добавили значение')
  }

  const onValueDelete = () => {
    console.log('удалили значение')
  }

  const onValuesClear = () => {
    console.log('очистили очередь')
  }

  return (
    <SolutionLayout title="Очередь">
      <section className={styles.form}>
        <div className={styles.input}>
          <Input 
            maxLength={4}
            isLimitText
            
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

    </SolutionLayout>
  );
};
