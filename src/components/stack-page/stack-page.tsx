import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {

  const onValueAdd = () => {
    console.log('добавили значение')
  }

  const onValueDelete = () => {
    console.log('удалили значение')
  }

  const onValuesClear = () => {
    console.log('очистили стек')
  }


  return (
    <SolutionLayout title="Стек">
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
